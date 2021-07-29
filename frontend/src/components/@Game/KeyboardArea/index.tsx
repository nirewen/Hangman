import React, { useCallback } from 'react'
import { IoPlay } from 'react-icons/io5'
import { Button, Tooltip } from '@chakra-ui/react'

import Keyboard from 'components/@Game/Keyboard'
import KeyboardHeader from 'components/@Game/KeyboardHeader'

import { useGame } from 'providers/Game'
import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'
import { useGameState } from 'providers/GameState'
import { useGameMessage } from 'providers/GameMessage'

import setWithTimeout from 'utils/setWithTimeout'

import { Container, Guesses, KeyboardContainer } from './styles'

const KeyboardArea: React.FC = () => {
    const { code, game } = useGame()
    const { state } = useGameState()
    const { setMessage } = useGameMessage()
    const user = useUser()
    const socket = useSocket()

    const handleStart = useCallback(() => {
        if (!game) return

        if (game.queue.length < 2)
            return setWithTimeout('You need at least 2 players to begin', value => {
                setMessage!({ type: 'error', value })
            })

        socket.emit('start', code, user)
    }, [code, game, socket, user, setMessage])

    const handlePlay = useCallback(
        (letter: string) => {
            if (!game.state.started || game.state.win || game.state.lost) return

            socket.emit('play', code, { user, letter })
        },
        [code, game, socket, user]
    )

    return (
        <Container>
            <Guesses>
                {[...game.guesses].reverse().map((g, i) => (
                    <span key={i} className={`${game.misses.includes(g) ? 'wrong' : 'right'}`}>
                        {g}
                    </span>
                ))}
            </Guesses>
            <KeyboardContainer game={game} user={user}>
                <KeyboardHeader game={game}>
                    <Tooltip
                        hasArrow
                        placement="top"
                        bg="red.600"
                        label="You need at least 2 players to start the game"
                        isOpen={game.queue.length < 2 && !state.defining}
                    >
                        <Button
                            colorScheme="white"
                            variant="outline"
                            size="lg"
                            leftIcon={<IoPlay />}
                            style={{ gridColumn: 'span 2' }}
                            onClick={handleStart}
                            disabled={game.queue.length < 2}
                        >
                            Start game
                        </Button>
                    </Tooltip>
                </KeyboardHeader>
                <Keyboard handlePlay={handlePlay} guesses={game.guesses} />
            </KeyboardContainer>
        </Container>
    )
}

export default KeyboardArea
