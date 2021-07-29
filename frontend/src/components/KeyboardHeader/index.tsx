import React from 'react'

import User from 'components/User'

import { useUser } from 'providers/User'

import { Container } from './styles'
import Hangman from 'structures/Hangman'

interface Props {
    game: Hangman
}

const KeyboardHeader: React.FC<Props> = ({ game: { state, queue, creator }, children }) => {
    const user = useUser()
    const playing = queue[0]

    if (!state.started || state.lost) {
        if (user.id === creator.id) {
            if (queue.length > 0) {
                return <Container>{children}</Container>
            } else {
                return (
                    <Container>
                        <span>Invite players to the game</span>
                    </Container>
                )
            }
        } else {
            return (
                <Container>
                    <span>Wait for the game to start</span>
                </Container>
            )
        }
    }

    if (playing.id !== user.id || state.win) {
        if (state.win) {
            const winner = queue.sort((a, b) => b.score - a.score)[0]

            return (
                <Container>
                    <User username={winner.user.username} avatar={winner.user.avatar} />
                    <span>won the game</span>
                </Container>
            )
        }

        if (user.id === creator.id)
            return (
                <Container>
                    <span>you already know the phrase, so you can't play</span>
                </Container>
            )
        return (
            <Container>
                <User username={playing.user.username} avatar={playing.user.avatar} />
                <span>is currently playing</span>
            </Container>
        )
    }

    return null
}

export default KeyboardHeader
