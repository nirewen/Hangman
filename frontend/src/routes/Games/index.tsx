import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from 'components/@Game/Card'
import Hangman from 'structures/Hangman'
import { useSocket } from 'providers/Socket'
import { useUser } from 'providers/User'

import { Button } from 'routes/Home/styles'

import { Container } from './styles'
import GameContext from 'providers/Game'

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

    return (
        <Container>
            {games &&
                games.map(game => (
                    <GameContext.Provider key={game.code} value={{ code: game.code, game }}>
                        <Card />
                    </GameContext.Provider>
                ))}
        </Container>
    )
}

export default Games
