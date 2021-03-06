import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Page from 'routes'
import Home from 'routes/Home'
import Login from 'routes/Login'
import Join from 'routes/Join'
import NewGame from 'routes/NewGame'
import Game from 'routes/Game'

import UserProvider from 'providers/User'
import SocketProvider from 'providers/Socket'

import GlobalStyle from './styles'

import { ChakraProvider } from '@chakra-ui/react'
import ThemeProvider from 'providers/Theme'

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <ThemeProvider>
                <GlobalStyle />
                <UserProvider>
                    <SocketProvider>
                        <Router>
                            <Switch>
                                <Route path="/" exact>
                                    <Page component={Home} />
                                </Route>
                                <Route path="/login" exact>
                                    <Page component={Login} />
                                </Route>
                                <Route path="/join" exact>
                                    <Page component={Join} />
                                </Route>
                                <Route path="/new" exact>
                                    <Page component={NewGame} />
                                </Route>
                                <Route path="/game/:code" exact>
                                    <Page component={Game} />
                                </Route>
                            </Switch>
                        </Router>
                    </SocketProvider>
                </UserProvider>
            </ThemeProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
