import React from 'react'

import { Container } from './styles'

interface Props {
    component: React.FC
}

const Route: React.FC<Props> = ({ component: Component }) => {
    return (
        <Container>
            <Component />
        </Container>
    )
}

export default Route
