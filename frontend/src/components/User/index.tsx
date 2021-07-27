import React from 'react'

import { Container, Avatar } from './styles'

export interface Props {
    current?: boolean
    username: string
    avatar: string
    score?: number
}

const User: React.FC<Props> = ({ current, username, avatar, score }) => {
    return (
        <Container className="user" current={current}>
            <Avatar src={avatar} alt={`${username}'s avatar`} />
            <span className="name">{username}</span>
            {!!score && <span className="score">{score}</span>}
        </Container>
    )
}

export default User
