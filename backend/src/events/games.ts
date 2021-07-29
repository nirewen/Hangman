import { io } from '../index'
import { Socket } from 'socket.io'

import games from '../data/games'
import { IUser } from '../database/models/User'
import { GameError, PlayerError } from '../structures/types/Errors'
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

        // if (user.id !== game.admin.id) {
        game.addPlayer(socket.id, user)
        // }

        socket.emit('joined', code)
        io.to(code).emit('update', game)
    })

    socket.on('fetch', (code: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        socket.emit('update', game)
    })

    socket.on('set-admin', (code: string, user: IUser, id: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        if (!(game.admin.id === user.id || game.creator.id === user.id))
            return socket.emit('error', 'You are not the admin of the game')

        game.setAdmin(id)

        io.to(code).emit('update', game)
    })

    socket.on('kick', (code: string, user: IUser, id: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return

        const kicked = game.queue.find(p => p.id === id)

        if (!kicked) return socket.emit('error', 'Player not found')

        game.removePlayer(kicked.socket)

        io.to(kicked.socket).emit('left')

        io.to(code).emit('update', game)
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
            .filter(([_, game]) => game.queue.find(p => p.id === user.id) || game.admin.id === user.id)
            .map(([_, game]) => game)

        socket.emit('games', userGames)
    })

    socket.on('set-phrase', (code: string, user: IUser, phrase: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (!user.id) return
        if (user.id !== game.admin.id) return

        const newPhrase = new Word(phrase)

        if (newPhrase.word !== game.word.word) io.to(code).emit('message', 'Phrase updated')
        else if (game.state.started) io.to(code).emit('message', 'Game reset')

        game.reset()
        game.setWord(newPhrase)

        io.to(code).emit('update', game)
    })

    socket.on('disconnecting', () => {
        socket.rooms.forEach(code => {
            socket.leave(code)

            const game = games[code]

            if (game) {
                if (game.creator.socket === socket.id) {
                    if (game.creator.id !== game.admin.id) {
                        game.creator = game.admin
                    }
                }

                game.removePlayer(socket.id)

                io.to(code).emit('update', game)
            }
        })
    })

    socket.on('leave-game', code => {
        const game = games[code]

        if (game) {
            const player = game.queue.find(p => p.socket === socket.id)

            if (!player) return socket.emit('error', 'You are not playing')

            if (game.creator.id !== game.admin.id && player.id === game.admin.id) game.admin = game.creator

            game.removePlayer(socket.id)

            io.to(code).emit('update', game)
            socket.emit('left')
        }
    })

    socket.on('play', async (code: string, { user, letter }: { user: IUser; letter: string }) => {
        if (!letter) return socket.emit('error', 'Missing letter')
        if (!user) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        if (!game.state.started) return socket.emit('error', 'Game not started')

        try {
            game.state.win = game.play(letter)

            await game.next()

            io.to(code).emit('play', user, letter)
        } catch (error) {
            if (error instanceof PlayerError) socket.emit('error', error.message)
            if (error instanceof GameError) io.to(code).emit('error', error.message)
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
