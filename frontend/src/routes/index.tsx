import React from 'react'

import NavBar from 'components/NavBar'

import { Container } from './styles'

interface Props {
    component: React.FC
}

const Route: React.FC<Props> = ({ component: Component }) => {
    return (
        <Container>
            <NavBar />
            <Component />
        </Container>
    )
}

export default Route
