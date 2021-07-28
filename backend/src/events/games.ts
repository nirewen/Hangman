import { io } from '../index'
import { Socket } from 'socket.io'

import games from '../data/games'
import { IUser } from '../database/models/User'
import { GameState, PlayerError } from '../structures/types/Errors'
import Word from '../structures/types/Word'

export default (socket: Socket) => {
    socket.on('join-room', (code: string, user: IUser) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        socket.join(code)

        io.to(code).emit('update', game)
    })

    socket.on('join-game', (code: string, user: IUser) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        if (user.id !== game.creator.id) {
            game.addPlayer(user.id, user)
        }

        socket.emit('joined')
    })

    socket.on('fetch', (code: string, user: IUser) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        socket.emit('update', game)
    })

    socket.on('start', (code: string, user: IUser) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return
        if (user.id !== game.creator.id) return

        game.state.started = true

        io.to(code).emit('update', game)
    })

    socket.on('fetch-games', (user: IUser) => {
        const userGames = Object.entries(games)
            .filter(([_, game]) => game.creator.id === user.id)
            .map(([_, game]) => game)

        socket.emit('games', userGames)
    })

    socket.on('fetch-state', (code: string, user: IUser) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        io.to(code).emit('state', game.state)
    })

    socket.on('set-phrase', (code: string, user: IUser, phrase: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return
        if (user.id !== game.creator.id) return

        const newPhrase = new Word(phrase)

        if (newPhrase.word !== game.word.word) io.to(code).emit('message', 'Phrase updated')
        else io.to(code).emit('message', 'Game reset')

        game.reset()
        game.setWord(newPhrase)

        io.to(code).emit('update', game)
    })

    socket.on('disconnnect', () => {
        socket.rooms.forEach(room => socket.leave(room))
    })

    socket.on('play', async (code: string, { user, letter }: { user: IUser; letter: string }) => {
        if (!letter) return socket.emit('error', 'Missing letter')
        if (!user) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        if (!game.state.started) return socket.emit('error', 'Game not started')

        try {
            const win = game.play(letter)

            await game.next()

            socket.to(code).emit('play', user, letter)

            if (win) game.state.win = true
        } catch (error) {
            if (error instanceof PlayerError) socket.emit('error', error.message)
            else if (error instanceof GameState) io.to(code).emit('state', { win: game.win, state: error.message })
        }

        io.to(code).emit('update', game)
    })

    socket.on('guess', async (code: string, { user, phrase }: { user: IUser; phrase: string }) => {
        if (!user) return socket.emit('error', 'Unauthorized')
        if (!phrase) return socket.emit('error', 'Missing guess')

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        if (!game.state.started) return socket.emit('error', 'Game not started')

        try {
            const player = game.queue.find(p => p.id === user.id)!
            const win = game.guess(phrase, player)

            await game.next()

            socket.to(code).emit('guess', { user, phrase })

            if (win) game.state.win = true
        } catch (error) {
            socket.emit('error', error.message)
        }

        io.to(code).emit('update', game)
    })
}
