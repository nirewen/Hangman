import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from 'components/@Game/Card'
import Hangman from 'structures/Hangman'
import { useSocket } from 'providers/Socket'
import { useUser } from 'providers/User'

import { Button } from 'routes/Home/styles'

import { Container } from './styles'
import GameContext from 'providers/Game'
import GameStateContext, { InternalState } from 'providers/GameState'

const Games: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const [fetched, setFetched] = useState(false)
    const [games, setGames] = useState<Hangman[]>()
    const [error, setError] = useState('')

    useEffect(() => {
        if (!fetched) socket.emit('fetch-games', user)
    }, [socket, user, fetched])

    socket.on('refetch', () => setFetched(false))
    socket.once('games', games => {
        setFetched(true)
        setGames(games)
    })
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
                games.map(game => {
                    const { code } = game
                    const joined = !!game.queue.find(p => p.id === user.id)
                    const state = { joined } as InternalState

                    return (
                        <GameContext.Provider key={game.code} value={{ code, game }}>
                            <GameStateContext.Provider value={{ state }}>
                                <Card />
                            </GameStateContext.Provider>
                        </GameContext.Provider>
                    )
                })}
        </Container>
    )
}

export default Games
