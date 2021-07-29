import React from 'react'
import { useGame } from 'providers/Game'

import { Container } from './styles'

const HangmanContainer: React.FC = () => {
    const game = useGame()

    return <Container></Container>
}

export default HangmanContainer
