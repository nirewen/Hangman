import React from 'react'
import { Link } from 'react-router-dom'

import { useUser } from 'providers/User'

import ThemePicker from 'components/ThemePicker'

import { Container, UserInfo } from './styles'

const NavBar: React.FC = () => {
    const user = useUser()

    return (
        <Container>
            <div>
                <Link className="game-name" to="/">
                    Hangman
                </Link>
            </div>
            <div>
                <ThemePicker />
                {user.id ? (
                    <UserInfo to={`/games`}>
                        <img src={user.avatar} width={20} height={20} alt={`${user.username}'s avatar`} />
                        <span>{user.username}</span>
                    </UserInfo>
                ) : (
                    <UserInfo to="/login">
                        <span>Login</span>
                    </UserInfo>
                )}
            </div>
        </Container>
    )
}

export default NavBar
