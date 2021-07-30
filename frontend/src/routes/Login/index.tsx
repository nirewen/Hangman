import React from 'react'
import { useLocation } from 'react-router-dom'

import { ReactComponent as Discord } from 'icons/Discord.svg'
import { ReactComponent as Twitter } from 'icons/Twitter.svg'
import { ReactComponent as Google } from 'icons/Google.svg'

import { Container, Header } from './styles'
import { Methods } from 'routes/Home/styles'
import MethodLink, { handleLogin } from 'components/MethodLink'

const Login: React.FC = () => {
    const query = new URLSearchParams(useLocation().search)
    const type = query.get('type')

    if (type) return handleLogin(type)

    return (
        <Container>
            <Header>Please choose a login method</Header>
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
        </Container>
    )
}

export default Login
