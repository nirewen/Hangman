import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Card from 'components/@Game/Card'
import Hangman from 'structures/Hangman'
import { useSocket } from 'providers/Socket'
import { useUser } from 'providers/User'

import { Button, Input } from 'routes/Home/styles'

import { Container, Content, EmptyContent, Header } from './styles'
import GameContext from 'providers/Game'
import GameStateContext, { InternalState } from 'providers/GameState'

const Games: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const [fetched, setFetched] = useState(false)
    const [games, setGames] = useState<Hangman[]>()
    const [error, setError] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        if (!fetched) socket.emit('fetch-games', user)
    }, [socket, user, fetched])

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.key === 'Enter') history.push(`/join?code=${code}`)
    }

    socket.on('refetch', () => setFetched(false))
    socket.once('games', games => {
        setFetched(true)
        setGames(games)
    })
    socket.once('error', setError)

    if (!!error && error === 'Empty')
        return (
            <Container>
                <Header>
                    <Link to="/new">
                        <Button>New game</Button>
                    </Link>
                    <Input
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        onKeyUp={handleSubmit}
                        maxLength={6}
                        placeholder="join game"
                    />
                </Header>
                <EmptyContent>
                    <span>Nothing to show here</span>
                </EmptyContent>
            </Container>
        )

    if (!games && !user.id)
        return (
            <Container>
                <Header>
                    <Button>New game</Button>
                    <Input
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        onKeyUp={handleSubmit}
                        maxLength={6}
                        placeholder="join game"
                        disabled
                    />
                </Header>
                <EmptyContent>
                    <span>Log in first</span>
                </EmptyContent>
            </Container>
        )

    return (
        <Container>
            <Header>
                <Link to="/new">
                    <Button>New game</Button>
                </Link>
                <Input
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    onKeyUp={handleSubmit}
                    maxLength={6}
                    placeholder="join game"
                />
            </Header>
            <Content>
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
            </Content>
        </Container>
    )
}

export default Games
