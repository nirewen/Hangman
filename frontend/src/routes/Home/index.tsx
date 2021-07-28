import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as GlitchLogo } from 'assets/Glitch.svg'

import { Container, Main, Header, Instructions, Button, Footer } from './styles'

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
                <img src="/img/How to play.png" alt="How to play Hangman" />
            </Instructions>
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
