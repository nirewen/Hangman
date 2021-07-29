import React, { useState } from 'react'

import { Container, Avatar } from './styles'

export interface Props {
    current?: boolean
    username: string
    avatar: string
    score?: number
    options?: React.FC
}

const User: React.FC<Props> = ({ current, username, avatar, score, options: Options }) => {
    const [hovering, setHovering] = useState(false)

    return (
        <Container
            className="user"
            current={current}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Avatar src={avatar} alt={`${username}'s avatar`} crossOrigin="anonymous" />
            <span className="name">{username}</span>
            {!!score && !hovering && <span className="score">{score}</span>}
            {hovering && Options && <Options />}
        </Container>
    )
}

export default User
