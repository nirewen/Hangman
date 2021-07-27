import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'

import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'

const Join: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)
    const code = query.get('code')

    useEffect(() => {
        socket?.emit('join-game', code, user)
    }, [socket, code, user])

    socket?.on('joined', () => history.push(`/game/${code}`))

    return null
}

export default Join
