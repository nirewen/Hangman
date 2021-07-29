import React, { useState } from 'react'
import { useGame } from 'providers/Game'
import { useSocket } from 'providers/Socket'

import { ReactComponent as PartyPopper } from 'icons/PartyPopper.svg'

import Letter from '../Letter'
import Space from '../Space'

import { Container, LetterRow, State } from './styles'

const WordContainer: React.FC = () => {
    const { game } = useGame()
    const socket = useSocket()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const setWithTimeout = (value: any, update: React.SetStateAction<any>, ms = 3000) => {
        update(value)

        setTimeout(() => update(null), ms)
    }

    socket.on('error', c => setWithTimeout(c, setError))
    socket.on('message', c => setWithTimeout(c, setMessage))

    return (
        <Container>
            {game.state.win && (
                <State bg={[352, 72, 60]}>
                    <PartyPopper />
                    GAME WON
                </State>
            )}
            {error && <State>{error}</State>}
            {message && <State bg={[116, 60, 40]}>{message}</State>}
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
