import React from 'react'
import { useLocation } from 'react-router-dom'

import Games from 'routes/Games'

import {
    Container,
    User,
    Header,
    Footer,
    Landing,
    Avatar,
    Username,
    Methods,
    Button,
    Heading,
    LoggedOut,
} from './styles'
import { useUser } from 'providers/User'
import MethodLink from 'components/MethodLink'

import { ReactComponent as GlitchLogo } from 'assets/Glitch.svg'
import { ReactComponent as Discord } from 'icons/Discord.svg'
import { ReactComponent as Twitter } from 'icons/Twitter.svg'
import { ReactComponent as Google } from 'icons/Google.svg'
import ThemePicker from 'components/ThemePicker'

const { REACT_APP_API_URL } = process.env

const handleLogout = (redirectTo?: string | null) => {
    let path = `${REACT_APP_API_URL}/api/auth/logout`

    if (redirectTo) path += `?redirectTo=${redirectTo}`

    window.location.href = path

    return null
}

const Home: React.FC = () => {
    const query = new URLSearchParams(useLocation().search)
    const redirectTo = query.get('redirectTo')
    const user = useUser()

    return (
        <Container>
            <Header>Hangman</Header>
            <Landing>
                {user.id ? (
                    <User>
                        <Avatar src={user.avatar} alt={`${user.username}'s avatar`} />
                        <Username>{user.username}</Username>
                        <a
                            href="/logout"
                            onClick={e => {
                                e.preventDefault()
                                handleLogout(redirectTo)
                            }}
                        >
                            <Button>Log out</Button>
                        </a>

                        <ThemePicker />
                    </User>
                ) : (
                    <LoggedOut>
                        <Heading>Login with</Heading>
                        <Methods>
                            <MethodLink type="discord" bg="#5865F2">
                                <Discord />
                                Discord
                            </MethodLink>
                            <MethodLink type="twitter" bg="#1D9BF0">
                                <Twitter />
                                Twitter
                            </MethodLink>
                            <MethodLink type="google" bg="#ffffff" color="#000000">
                                <Google />
                                Google
                            </MethodLink>
                        </Methods>
                    </LoggedOut>
                )}
                <Games />
            </Landing>
            <Footer>
                <div>
                    <span>Made by</span>
                    <a href="https://github.com/nirewen">
                        <img
                            className="avatar"
                            src="https://avatars.githubusercontent.com/u/8761479?s=60&amp;v=4"
                            alt="Nirewen's GitHub avatar"
                        />
                        Nirewen
                    </a>
                </div>
                <div>
                    <span>Powered by</span>
                    <a href="https://glitch.com">
                        <GlitchLogo />
                    </a>
                </div>
            </Footer>
        </Container>
    )
}

export default Home
