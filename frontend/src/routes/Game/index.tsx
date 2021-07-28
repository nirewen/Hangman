import React, { useState, useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'

import { FaPlay, FaTrash, FaChevronRight, FaPencilAlt, FaExclamationCircle } from 'react-icons/fa'
import { CgHashtag } from 'react-icons/cg'

import PartyPopper from 'icons/PartyPopper.svg'

import api from 'services/api'

import Hangman from 'structures/Hangman'
import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'

import User from 'components/User'
import Keyboard from 'components/Keyboard'
import Space from 'components/Space'
import Letter from 'components/Letter'
import KeyboardHeader from 'components/KeyboardHeader'
import InviteButton from 'components/InviteButton'
import Loading from 'components/Loading'

import { Button, Tooltip } from '@chakra-ui/react'

import {
    Container,
    LeftSide,
    Middle,
    RightSide,
    LetterRow,
    Panel,
    Users,
    KeyboardContainer,
    State,
    GameCard,
} from './styles'
import NewGame from 'routes/NewGame'

Modal.setAppElement('#root')

const Game: React.FC = () => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const { code }: { code: string } = useParams()
    const [game, setGame] = useState<Hangman | null>()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [settingWord, setSettingWord] = useState(false)
    const [guessingWord, setGuessingWord] = useState(false)

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!user.id) history.push(`/login?redirectTo=/game/${code}`)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [code, history, user])

    useEffect(() => {
        if (code && user) {
            socket?.emit('join-room', code, user)
            socket?.emit('fetch-state', code, user)
        }
    }, [socket, code, user])

    const setWithTimeout = (value: any, update: React.SetStateAction<any>, ms = 3000) => {
        update(value)

        setTimeout(() => update(null), ms)
    }

    const handleStart = async () => {
        if (!game) return

        if (game.queue.length < 2) return setWithTimeout('You need at least 2 players to begin', setError)

        socket?.emit('start', code, user)
    }

    const handlePlay = async (letter: string) => {
        if (!game?.state.started || game?.state.win) return

        socket?.emit('play', code, { user, letter })
    }

    const handleDelete = async () => {
        await api.delete(`/api/games/${code}`, { withCredentials: true }).catch(e => e)

        history.push('/')
    }

    socket?.on('update', setGame)
    socket?.on('delete', () => history.push('/'))
    socket?.on('error', c => setWithTimeout(c, setError))
    socket?.on('message', c => setWithTimeout(c, setMessage))

    if (!game) {
        if (error === 'Game not found') return <Redirect to="/" />
        else
            return (
                <Container>
                    <Loading />
                </Container>
            )
    }

    return (
        <Container>
            <LeftSide></LeftSide>
            <Middle>
                {game.state.win && (
                    <State bg={[352, 72, 60]}>
                        <img src={PartyPopper} width={30} height={30} alt="Party popper icon" />
                        GAME WON
                    </State>
                )}
                {error && <State>{error}</State>}
                {message && <State bg={[116, 60, 40]}>{message}</State>}
                <LetterRow>
                    {game.word.letters.map((l, i) => {
                        if (l.letter === '\u3000') return <Space key={i} />
                        return <Letter key={i}>{!l.hidden ? l.letter : '\u00a0'}</Letter>
                    })}
                </LetterRow>
            </Middle>
            <RightSide>
                <Panel>
                    <Button
                        colorScheme="green"
                        size="sm"
                        leftIcon={<FaExclamationCircle />}
                        onClick={() => setGuessingWord(true)}
                        disabled={!game.state.started || user.id === game.creator.id}
                    >
                        Guess phrase
                    </Button>
                    <InviteButton link={`${window.location.origin}/join?code=${code}`} />

                    {game.creator.id === user.id && (
                        <>
                            <Button size="sm" leftIcon={<FaPencilAlt />} onClick={() => setSettingWord(true)}>
                                Set phrase
                            </Button>
                            <Button colorScheme="red" size="sm" leftIcon={<FaTrash />} onClick={handleDelete}>
                                Delete
                            </Button>
                        </>
                    )}
                </Panel>
                {game.queue.length > 0 && (
                    <Users>
                        {[...game.queue]
                            .sort((a, b) => b.score - a.score)
                            .map((p, i) => (
                                <React.Fragment key={i}>
                                    {i === 0 && <span className="title">PLAYERS</span>}
                                    <User
                                        current={game.queue[0].id === p.id && !game.state.win}
                                        username={p.user.username}
                                        avatar={p.user.avatar}
                                        score={p.score}
                                    />
                                </React.Fragment>
                            ))}
                    </Users>
                )}
            </RightSide>
            <KeyboardContainer game={game} user={user}>
                <KeyboardHeader game={game}>
                    <Tooltip
                        hasArrow
                        placement="top"
                        bg="red.600"
                        label="You need at least 2 players to start the game"
                        isOpen={game.queue.length < 2 && !settingWord}
                    >
                        <Button
                            colorScheme="white"
                            variant="outline"
                            size="lg"
                            leftIcon={<FaPlay />}
                            style={{ gridColumn: 'span 2' }}
                            onClick={handleStart}
                            disabled={game.queue.length < 2}
                        >
                            Start game
                        </Button>
                    </Tooltip>
                </KeyboardHeader>
                <Keyboard handlePlay={handlePlay} guesses={game.guesses} />
            </KeyboardContainer>
            <Modal className="Modal" overlayClassName="Overlay" isOpen={settingWord} shouldCloseOnOverlayClick={true}>
                <a onClick={() => setSettingWord(false)}>&times;</a>
                <NewGame
                    currentPhrase={game.word.word}
                    headerContent={() => <>Type the new phrase</>}
                    submitText="Set"
                    onSubmit={async (phrase: string) => {
                        socket?.emit('set-phrase', code, user, phrase)
                        setSettingWord(false)
                    }}
                />
            </Modal>
            <Modal className="Modal" overlayClassName="Overlay" isOpen={guessingWord} shouldCloseOnOverlayClick={true}>
                <a onClick={() => setGuessingWord(false)}>&times;</a>
                <NewGame
                    headerContent={() => <>What's the phrase?</>}
                    submitText="Guess"
                    onSubmit={async (phrase: string) => {
                        socket?.emit('guess', code, { user, phrase })
                        setGuessingWord(false)
                    }}
                />
            </Modal>
        </Container>
    )
}

interface Props {
    code: string
}

const Card: React.FC<Props> = ({ code }) => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const [game, setGame] = useState<Hangman | null>()

    useEffect(() => {
        if (code && user) {
            socket?.emit('fetch', code, user)
        }
    }, [socket, code, user])

    socket?.on('update', game => game.code === code && setGame(game))

    if (!game)
        return (
            <GameCard>
                <Loading />
            </GameCard>
        )

    return (
        <GameCard>
            <span className="code">
                <CgHashtag strokeWidth={0.5} />
                {game.code}
            </span>
            <div className="content word">
                {game.word.letters.map((l, i) => {
                    if (l.letter === '\u3000') return <Space key={i} />
                    return <Letter key={i}>{!l.hidden ? l.letter : '\u00a0'}</Letter>
                })}
            </div>
            <div className="content players">
                {game.queue.map((p, i) => (
                    <Tooltip key={p.id} hasArrow label={p.user.username} placement="top">
                        <img className={`player${i === 0 ? ' current' : ''}`} src={p.user.avatar} />
                    </Tooltip>
                ))}
            </div>
            <div className="content options">
                <InviteButton link={`${window.location.origin}/join?code=${game.code}`} />
                <Button
                    colorScheme="green"
                    size="sm"
                    rightIcon={<FaChevronRight />}
                    onClick={() => history.push(`/game/${game.code}`)}
                >
                    View
                </Button>
            </div>
        </GameCard>
    )
}

export { Card }

export default Game
