import React from 'react'

import { Container } from './styles'

const Letter: React.FC = ({ children }) => {
    return (
        <Container>
            <span>{children}</span>
        </Container>
    )
}

export default Letter
