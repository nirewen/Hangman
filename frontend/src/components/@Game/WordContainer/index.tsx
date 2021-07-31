import React, { useCallback, useEffect, useMemo } from 'react'
import { useGame } from 'providers/Game'
import { useSocket } from 'providers/Socket'

import { ReactComponent as PartyPopper } from 'icons/PartyPopper.svg'

import Letter from '../Letter'
import Space from '../Space'

import { useGameMessage } from 'providers/GameMessage'
import setWithTimeout from 'utils/setWithTimeout'

import { Container, LetterRow, State } from './styles'

const WordContainer: React.FC = () => {
    const { game } = useGame()
    const { message, setMessage } = useGameMessage()
    const socket = useSocket()

    const initialValue = useMemo(() => ({ type: '', value: '' }), [])

    const handleError = useCallback(
        value => setWithTimeout({ type: 'error', value }, setMessage!, initialValue),
        [setMessage, initialValue]
    )

    const handleMessage = useCallback(
        ({ type, value }) => setWithTimeout({ type, value }, setMessage!, initialValue),
        [setMessage, initialValue]
    )

    useEffect(() => {
        socket.on('error', handleError)
        socket.on('message', handleMessage)

        return () => {
            socket.off('error', handleError)
            socket.off('message', handleMessage)
        }
    }, [socket, handleError, handleMessage])

    return (
        <Container>
            {game.state.win && (
                <State bg={[352, 72, 60]}>
                    <PartyPopper />
                    GAME WON
                </State>
            )}
            {message.type === 'error' && <State>{message.value}</State>}
            {message.type === 'message' && <State bg={[116, 60, 40]}>{message.value}</State>}
            {message.type === 'request' && <State bg={[42, 96, 47]}>{message.value}</State>}
            <LetterRow>
                {game.word.letters.map((l, i) => {
                    if (l.letter === '\u3000') return <Space key={i} />
                    return <Letter key={i}>{!l.hidden ? l.letter : '\u00a0'}</Letter>
                })}
            </LetterRow>
        </Container>
    )
}

export default WordContainer
