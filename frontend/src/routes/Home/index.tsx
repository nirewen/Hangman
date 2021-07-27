import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Main, Header, Instructions, Button } from './styles'

const Home: React.FC = () => {
    return (
        <Container>
            <Main>
                <Header>
                    Welcome to
                    <span>Hangman</span>
                </Header>
                <Link to="/new">
                    <Button>New game</Button>
                </Link>
            </Main>
            <Instructions>
                <img src="/How to play.png" alt="How to play Hangman" />
            </Instructions>
        </Container>
    )
}

export default Home
