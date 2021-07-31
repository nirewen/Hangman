import React, { useCallback, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'

import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'
import { Container } from './styles'
import Loading from 'components/Loading'

const Join: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)
    const code = query.get('code')

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!user.id) {
                history.push(`/login?redirectTo=/join?code=${code}`)
            }
        }, 1000)

        return () => clearTimeout(timeout)
    }, [code, history, user])

    useEffect(() => {
        socket.emit('join-game', code, user)
    }, [socket, code, user])

    const handleError = useCallback(
        e => {
            if (e === 'Game not found') {
                return history.push('/')
            }
        },
        [history]
    )

    const handleJoined = useCallback(
        code => {
            history.push(`/game/${code}`)
        },
        [history]
    )

    useEffect(() => {
        socket.on('error', handleError)
        socket.on('joined', handleJoined)

        return () => {
            socket.off('error', handleError)
            socket.off('joined', handleJoined)
        }
    }, [socket, handleError, handleJoined])

    return (
        <Container>
            <Loading />
            <span>Joining game...</span>
        </Container>
    )
}

export default Join
