import React from 'react'
import { useLocation } from 'react-router-dom'

import { Container } from './styles'

const { REACT_APP_API_URL } = process.env

interface Props {
    type: string
    bg?: string
    color?: string
}

export const handleLogin = (type: string, redirectTo?: string | null) => {
    let path = `${REACT_APP_API_URL}/api/auth/${type}`

    if (redirectTo) path += `?redirectTo=${redirectTo}`

    window.location.href = path

    return null
}

const MethodLink: React.FC<Props> = ({ type, bg, color, children }) => {
    const query = new URLSearchParams(useLocation().search)
    const redirectTo = query.get('redirectTo')

    return (
        <Container
            href={`/login/${type}`}
            onClick={e => {
                e.preventDefault()
                handleLogin(type, redirectTo)
            }}
            bg={bg}
            color={color}
        >
            {children}
        </Container>
    )
}

export default MethodLink
