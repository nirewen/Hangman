import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Hangman from 'structures/Hangman'
import { useSocket } from 'providers/Socket'
import { useUser } from 'providers/User'

import { Card } from 'routes/Game'
import { Button } from 'routes/Home/styles'

import { Container } from './styles'

const Games: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const [games, setGames] = useState<Hangman[]>()
    const [error, setError] = useState('')

    useEffect(() => {
        socket.emit('fetch-games', user)
    }, [socket, user])

    socket.on('refetch', () => socket.emit('fetch-games', user))
    socket.once('games', setGames)
    socket.once('error', setError)

    if (!!error && error === 'Empty')
        return (
            <Container>
                <span>Nothing to display here</span>
                <Link to="/new">
                    <Button>New game</Button>
                </Link>
            </Container>
        )

    return <Container>{games && games.map(game => <Card key={game.code} code={game.code} />)}</Container>
}

export default Games
