import React, { useState } from 'react'

import { Container, Avatar } from './styles'

export interface Props {
    current?: boolean
    username: string
    avatar: string
    score?: number
    options?: React.FC
    displayOptions?: boolean
}

const User: React.FC<Props> = ({ current, username, avatar, score, options: Options, displayOptions }) => {
    const [hovering, setHovering] = useState(displayOptions)

    return (
        <Container
            className="user"
            current={current}
            onMouseEnter={() => setHovering(displayOptions || true)}
            onMouseLeave={() => setHovering(displayOptions || false)}
        >
            <Avatar src={avatar} alt={`${username}'s avatar`} crossOrigin="anonymous" />
            <span className="name">{username}</span>
            {!!score && !hovering && <span className="score">{score}</span>}
            {hovering && Options && <Options />}
        </Container>
    )
}

export default User
