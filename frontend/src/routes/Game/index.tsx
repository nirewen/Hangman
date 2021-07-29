import React, { useState, useEffect, useCallback } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Hangman from 'structures/Hangman'
import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'

import Loading from 'components/Loading'
import GuessModal from 'components/@Game/Modal/Guess'
import DefineModal from 'components/@Game/Modal/Define'

import KeyboardArea from 'components/@Game/KeyboardArea'
import HangmanContainer from 'components/@Game/HangmanContainer'
import WordContainer from 'components/@Game/WordContainer'
import GameContext from 'providers/Game'
import GameMessageContext, { GameMessage } from 'providers/GameMessage'
import { InternalState } from 'providers/GameState'
import GameSidebar from 'components/@Game/GameSidebar'

import { Container } from './styles'
import GameStateContext from 'providers/GameState'

const Game: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()

    const { code }: { code: string } = useParams()
    const [game, setGame] = useState<Hangman | null>()

    const [message, updateMessage] = useState<GameMessage>({} as GameMessage)
    const [state, updateState] = useState<InternalState>({
        defining: false,
        guessing: false,
    })

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!user.id) history.push(`/login?redirectTo=/game/${code}`)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [code, history, user])

    useEffect(() => {
        if (code && user) {
            socket.emit('join-room', code, user)
        }
    }, [socket, code, user])

    const setState = (newState: InternalState) => {
        updateState({
            ...state,
            ...newState,
        })
    }

    const setMessage = (newMessage: GameMessage) => {
        updateMessage({
            ...message,
            ...newMessage,
        })
    }

    socket.on('update', setGame)
    socket.on('delete', () => history.push('/'))
    socket.on('message', (type, value) => setMessage({ type, value }))

    if (!game) {
        if (message.type === 'error' && message.value === 'Game not found') return <Redirect to="/" />
        else
            return (
                <Container>
                    <Loading />
                </Container>
            )
    }

    return (
        <GameContext.Provider value={{ code, game }}>
            <GameStateContext.Provider value={{ state, setState }}>
                <GameMessageContext.Provider value={{ message, setMessage }}>
                    <Container>
                        <HangmanContainer />
                        <WordContainer />
                        <GameSidebar />
                        <KeyboardArea />
                        <GuessModal />
                        <DefineModal />
                    </Container>
                </GameMessageContext.Provider>
            </GameStateContext.Provider>
        </GameContext.Provider>
    )
}

export default Game
