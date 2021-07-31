import { io } from '../index'
import { Socket } from 'socket.io'

import games from '../data/games'
import { IUser } from '../database/models/User'
import { GameError, PlayerError } from '../structures/types/Errors'
import Word from '../structures/types/Word'

export default (socket: Socket) => {
    socket.on('join-room', (code: string, user: IUser) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        socket.join(code)

        io.to(code).emit('update', game)
    })

    socket.on('join-game', (code: string, user: IUser) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        if (user.id !== game.admin.id) {
            game.addPlayer(socket.id, user)
        }

        socket.emit('joined', code)
        io.to(code).emit('update', game)
    })

    socket.on('fetch', (code: string) => {
        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        socket.emit('update', game)
    })

    socket.on('set-admin', (code: string, user: IUser, id: string) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        if (!(game.admin.id === user.id || game.creator.id === user.id))
            return socket.emit('error', 'You are not the admin of the game')

        game.setAdmin(id)

        io.to(code).emit('update', game)
    })

    socket.on('kick', (code: string, user: IUser, id: string) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')

        const kicked = game.queue.find(p => p.id === id)

        if (!kicked) return socket.emit('error', 'Player not found')

        game.removePlayer(kicked.socket)

        io.to(kicked.socket).emit('left')

        io.to(code).emit('update', game)
    })

    socket.on('start', (code: string, user: IUser) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (user.id !== game.admin.id) return

        game.reset()

        game.state.started = true

        io.to(code).emit('update', game)
    })

    socket.on('fetch-games', (user: IUser) => {
        if (!user.id) return

        const userGames = Object.values(games).filter(
            game => game.queue.find(p => p.id === user.id) || game.admin.id === user.id
        )

        if (userGames.length > 0) return socket.emit('games', userGames)
        else return socket.emit('error', 'Empty')
    })

    socket.on('set-phrase', (code: string, user: IUser, phrase: string) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (user.id !== game.admin.id) return

        const newPhrase = new Word(phrase)

        if (newPhrase.word !== game.word.word) io.to(code).emit('message', 'Phrase updated')
        else if (game.state.started) io.to(code).emit('message', 'Game reset')

        game.reset()
        game.setWord(newPhrase)

        io.to(code).emit('update', game)
    })

    socket.on('reveal-phrase', (code: string, user: IUser) => {
        if (!user.id) return

        const game = games[code]

        if (!game) return socket.emit('error', 'Game not found')
        if (user.id !== game.admin.id) return

        game.revealWord()
        game.state.lost = true

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

            if (game.queue.length < 2) {
                game.state.started = false

                io.to(code).emit('message', 'Game paused')
            }

            io.emit('refetch')
            io.to(code).emit('update', game)
            socket.emit('left')
        }
    })

    socket.on('play', async (code: string, { user, letter }: { user: IUser; letter: string }) => {
        if (!user.id) return
        if (!letter) return socket.emit('error', 'Missing letter')

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
        if (!user.id) return
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
