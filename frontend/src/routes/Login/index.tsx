import React from 'react'
import { useLocation } from 'react-router-dom'

import Discord from 'icons/Discord.svg'
import Twitter from 'icons/Twitter.svg'
import Google from 'icons/Google.svg'

import { Container, Header, Method, Methods } from './styles'

const { REACT_APP_API_URL } = process.env

interface Props {
    type: string
    bg?: string
    color?: string
}

const handleLogin = (type: string, redirectTo?: string | null) => {
    let path = `${REACT_APP_API_URL}/api/auth/${type}`

    if (redirectTo) path += `?redirectTo=${redirectTo}`

    window.location.href = path

    return null
}

const MethodLink: React.FC<Props> = ({ type, bg, color, children }) => {
    const query = new URLSearchParams(useLocation().search)
    const redirectTo = query.get('redirectTo')

    return (
        <Method href={`#${type}`} onClick={() => handleLogin(type, redirectTo)} bg={bg} color={color}>
            {children}
        </Method>
    )
}

const Login: React.FC = () => {
    const query = new URLSearchParams(useLocation().search)
    const type = query.get('type')

    if (type) return handleLogin(type)

    return (
        <Container>
            <Header>Please choose a login method</Header>
            <Methods>
                <MethodLink type="discord" bg="#5865F2">
                    <img src={Discord} alt="Discord icon" />
                    Discord
                </MethodLink>
                <MethodLink type="twitter" bg="#1D9BF0">
                    <img src={Twitter} alt="Twitter icon" />
                    Twitter
                </MethodLink>
                <MethodLink type="google" bg="#ffffff" color="#000000">
                    <img src={Google} alt="Google icon" />
                    Google
                </MethodLink>
            </Methods>
        </Container>
    )
}

export default Login
