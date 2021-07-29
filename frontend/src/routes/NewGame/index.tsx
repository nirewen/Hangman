import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from 'services/api'
import { useUser } from 'providers/User'
import { useSocket } from 'providers/Socket'

import Letter from 'components/@Game/Letter'
import Space from 'components/@Game/Space'

import { Container, CreateButton, Header, LetterRow, Letters, PhraseInput } from './styles'

interface Props {
    headerContent?: React.FC
    submitText?: string
    currentPhrase?: string
    onSubmit?(phrase: string): void
}

const NewGame: React.FC<Props> = ({ headerContent: HeaderContent, submitText, currentPhrase, onSubmit }) => {
    const user = useUser()
    const socket = useSocket()
    const history = useHistory()
    const [which, setWhich] = useState('word')
    const [phrase, setPhrase] = useState(currentPhrase || '')
    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => inputRef.current?.focus(), [inputRef])

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!user.id) history.push(`/login?redirectTo=/new`)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [history, user])

    const handleCreation = onSubmit
        ? onSubmit
        : async (phrase: string) => {
              const game = await api
                  .post('/api/games', { phrase, user, socket: socket.id }, { withCredentials: true })
                  .then(({ data }) => data)
                  .catch(e => e)

              if (game) history.push(`/game/${game.code}`)
          }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value.toUpperCase()

        if (value.includes(' ')) setWhich('phrase')
        else setWhich('word')

        if (!/^[A-Z\u00C0-\u024F\u1E00-\u1EFF\s+]*$/g.test(value)) return

        value = value.replace(/( +(?= )|\n)/g, '')

        setPhrase(value)
    }

    return (
        <Container>
            <Header>{HeaderContent ? <HeaderContent /> : `Select the ${which}!`}</Header>
            <Letters onClick={() => inputRef.current?.focus()}>
                <PhraseInput
                    ref={inputRef}
                    name="phrase"
                    id="phrase"
                    value={phrase}
                    maxLength={64}
                    onChange={handleChange}
                    onKeyUp={e => e.key === 'Enter' && handleCreation(phrase)}
                    onFocus={() => {
                        const input = inputRef?.current

                        if (input) {
                            input.selectionStart = input.value.length
                            input.selectionEnd = input.value.length
                        }
                    }}
                    minLength={4}
                />
                <LetterRow>
                    {(phrase || 'TYPE HERE').split('').map((l, i) => {
                        if (l === ' ') return <Space key={i} />
                        return <Letter key={i}>{l}</Letter>
                    })}
                </LetterRow>
            </Letters>
            <CreateButton onClick={() => handleCreation(phrase)} disabled={phrase === ''}>
                {submitText || 'Start'}
            </CreateButton>
        </Container>
    )
}

export default NewGame
