import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Tooltip } from '@chakra-ui/react'
import api from 'services/api'

import { IoTrash, IoInformationCircle, IoExit, IoEnter } from 'react-icons/io5'
import { FaPencilAlt } from 'react-icons/fa'
import { RiVipCrown2Fill } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai'

import User from 'components/User'
import { useGame } from 'providers/Game'
import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'
import { useGameState } from 'providers/GameState'

import InviteButton from '../InviteButton'

import { Container, Panel, Users } from './styles'

const GameSidebar: React.FC = () => {
    const history = useHistory()
    const { code, game } = useGame()
    const { setState } = useGameState()
    const user = useUser()
    const socket = useSocket()
    const [joined, setJoined] = useState(false)

    useEffect(() => {
        const player = game.queue.find(p => p.id === user.id)

        if (player) setJoined(true)
        else setJoined(false)
    }, [game, user.id])

    const handleJoinLeave = useCallback(() => {
        if (!game) return

        if (joined) socket.emit('leave-game', code)
        else socket.emit('join-game', code, user)
    }, [code, game, user, socket, joined])

    const handleDelete = useCallback(() => {
        api.delete(`/api/games/${code}`, { withCredentials: true })
            .then(() => history.push('/'))
            .catch(e => e)
    }, [code, history])

    return (
        <Container>
            <User
                username={user.username}
                avatar={user.avatar}
                options={() => {
                    return (
                        <div className="options">
                            <Button size="sm" colorScheme="blue" onClick={() => history.push('/')}>
                                <AiFillHome />
                            </Button>
                        </div>
                    )
                }}
                displayOptions
            />
            <Panel>
                <Button
                    colorScheme="green"
                    size="sm"
                    leftIcon={<IoInformationCircle />}
                    onClick={() => setState!({ guessing: true })}
                    disabled={game.state.lost || game.state.win || !game.state.started || game.admin.id === user.id}
                >
                    Guess phrase
                </Button>

                <InviteButton link={`${window.location.origin}/join?code=${code}`} />

                {game.admin.id === user.id && (
                    <Button size="sm" leftIcon={<FaPencilAlt />} onClick={() => setState!({ defining: true })}>
                        Set phrase
                    </Button>
                )}

                {game.admin.id !== user.id && (
                    <Button
                        colorScheme={joined ? 'red' : 'gray'}
                        size="sm"
                        leftIcon={joined ? <IoExit /> : <IoEnter />}
                        onClick={handleJoinLeave}
                        disabled={game.admin.id === user.id}
                    >
                        {joined ? 'Leave game' : 'Join game'}
                    </Button>
                )}

                {game.creator.id === user.id && (
                    <Button colorScheme="red" size="sm" leftIcon={<IoTrash />} onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </Panel>
            <Users>
                <span className="title">ADMIN</span>
                <User username={game.admin.user.username} avatar={game.admin.user.avatar} displayOptions />
                {game.queue.length > 0 &&
                    [...game.queue]
                        .sort((a, b) => b.score - a.score)
                        .map((p, i) => (
                            <React.Fragment key={i}>
                                {i === 0 && <span className="title">PLAYERS</span>}
                                <User
                                    current={game.queue[0].id === p.id && !game.state.win}
                                    username={p.user.username}
                                    avatar={p.user.avatar}
                                    score={p.score}
                                    options={() =>
                                        game.admin.id === user.id || game.creator.id === user.id ? (
                                            <div className="options">
                                                <Tooltip hasArrow placement="top" label="Make admin">
                                                    <Button
                                                        size="sm"
                                                        colorScheme="gray"
                                                        onClick={() => socket.emit('set-admin', code, user, p.id)}
                                                    >
                                                        <RiVipCrown2Fill fill="black" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip hasArrow placement="top" label="Kick">
                                                    <Button
                                                        size="sm"
                                                        colorScheme="red"
                                                        onClick={() => socket.emit('kick', code, user, p.id)}
                                                    >
                                                        <IoExit />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        ) : null
                                    }
                                />
                            </React.Fragment>
                        ))}
            </Users>
        </Container>
    )
}

export default GameSidebar
