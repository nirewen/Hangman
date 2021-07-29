import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Tooltip } from '@chakra-ui/react'
import api from 'services/api'

import { IoChevronForward, IoExit, IoTrash } from 'react-icons/io5'
import { CgHashtag } from 'react-icons/cg'

import { useGame } from 'providers/Game'

import Space from '../Space'
import Letter from '../Letter'
import InviteButton from '../InviteButton'

import { useGameState } from 'providers/GameState'
import { useSocket } from 'providers/Socket'

import { Code, Container, Content } from './styles'

const Card: React.FC = () => {
    const { code, game } = useGame()
    const { state } = useGameState()
    const socket = useSocket()
    const history = useHistory()

    const handleDeleteLeave = useCallback(() => {
        if (!game) return

        if (state.joined) socket.emit('leave-game', code)
        else api.delete(`/api/games/${code}`, { withCredentials: true }).catch(e => e)
    }, [code, game, socket, state])

    return (
        <Container>
            <Code>
                <CgHashtag strokeWidth={0.5} />
                {game.code}
            </Code>
            <Content className="word">
                {game.word.letters.map((l, i) => {
                    if (l.letter === '\u3000') return <Space key={i} />
                    return <Letter key={i}>{!l.hidden ? l.letter : '\u00a0'}</Letter>
                })}
            </Content>
            <Content className="players">
                {game.queue.map((p, i) => (
                    <Tooltip key={p.id} hasArrow label={p.user.username} placement="top">
                        <img className={`player${i === 0 ? ' current' : ''}`} src={p.user.avatar} />
                    </Tooltip>
                ))}
            </Content>
            <Content className="options">
                <InviteButton link={`${window.location.origin}/join?code=${game.code}`} />
                <Button
                    colorScheme="green"
                    size="sm"
                    rightIcon={<IoChevronForward />}
                    onClick={() => history.push(`/game/${game.code}`)}
                >
                    View
                </Button>
                <Button
                    colorScheme="red"
                    size="sm"
                    rightIcon={state.joined ? <IoExit /> : <IoTrash />}
                    onClick={handleDeleteLeave}
                >
                    {state.joined ? 'Leave' : 'Delete'}
                </Button>
            </Content>
        </Container>
    )
}

export default Card
