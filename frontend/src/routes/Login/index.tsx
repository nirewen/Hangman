import React from 'react'
import { useLocation } from 'react-router-dom'

import Discord from 'icons/Discord.svg'

import { Container, Header, Method, Methods } from './styles'

const { ENVIRONMENT } = process.env

interface Props {
    type: string
    bg?: string
}

const handleLogin = (type: string, redirectTo?: string | null) => {
    let path = `${ENVIRONMENT === 'production' ? '' : 'http://localhost:3001'}/api/auth/${type}`

    if (redirectTo) path += `?redirectTo=${redirectTo}`

    window.location.href = path

    return null
}

const MethodLink: React.FC<Props> = ({ type, bg, children }) => {
    const query = new URLSearchParams(useLocation().search)
    const redirectTo = query.get('redirectTo')

    return (
        <Method href={`#${type}`} onClick={() => handleLogin(type, redirectTo)} bg={bg}>
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
            </Methods>
        </Container>
    )
}

export default Login
