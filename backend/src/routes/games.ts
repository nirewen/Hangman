import { Request, Response, NextFunction, Router } from 'express'
import { genId } from '../utils'
import { Hangman } from '../structures/Hangman'

import games from '../data/games'
import { io } from '../index'

const router = Router()

const genCode: () => string = () => {
    const code = genId()

    if (games[code]) return genCode()

    return code
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next()
    else res.status(401).send({ error: 'Unauthorized' })
}

router.post('/', authMiddleware, (req: Request, res: Response) => {
    const { phrase, user, socket } = req.body

    if (!phrase) return res.status(400).send({ error: 'Missing phrase' })

    const code = genCode()

    games[code] = new Hangman(code, socket, user, phrase)

    res.send(games[code])
})

router.delete('/:code', authMiddleware, (req: Request, res: Response) => {
    const { code } = req.params

    const game = games[code]

    if (!game) return res.status(404).send({ error: 'Game not found' })

    // @ts-ignore
    if (game.creator.id === req.user?.id) {
        const creatorSocket = io.sockets.sockets.get(game.creator.socket)

        if (creatorSocket) creatorSocket.leave(code)

        io.to(code).emit('delete')

        io.sockets.sockets.forEach(socket => socket.leave(code))

        delete games[code]

        io.emit('refetch')

        res.send({ message: 'Success' })
    }
})

export default router
