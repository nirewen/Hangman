import React, { useState, useEffect } from 'react'

import Hangman from 'structures/Hangman'
import { useSocket } from 'providers/Socket'
import { useUser } from 'providers/User'

import { Container } from './styles'
import { Card } from 'routes/Game'

const Games: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const [games, setGames] = useState<Hangman[]>()

    useEffect(() => {
        socket.emit('fetch-games', user)
    }, [socket, user])

    socket.on('games', setGames)

    return <Container>{games && games.map(game => <Card key={game.code} code={game.code} />)}</Container>
}

export default Games
