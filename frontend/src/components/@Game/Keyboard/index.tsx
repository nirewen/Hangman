import React from 'react'

import Key from './Key'

import { clean } from 'utils'

import { Container, KeyRow } from './styles'

interface Props {
    guesses: string[]
    handlePlay(letter: string): void
}

const Keyboard: React.FC<Props> = ({ guesses, handlePlay }) => {
    return (
        <Container className="keyboard">
            <KeyRow>
                {'QWERTYUIOP'.split('').map((k, i) => (
                    <Key key={i} onClick={_ => handlePlay(k)} disabled={guesses.includes(clean(k))}>
                        {k}
                    </Key>
                ))}
            </KeyRow>
            <KeyRow>
                {'ASDFGHJKL'.split('').map((k, i) => (
                    <Key key={i} onClick={_ => handlePlay(k)} disabled={guesses.includes(clean(k))}>
                        {k}
                    </Key>
                ))}
            </KeyRow>
            <KeyRow>
                {'ZXCVBNM'.split('').map((k, i) => (
                    <Key key={i} onClick={_ => handlePlay(k)} disabled={guesses.includes(clean(k))}>
                        {k}
                    </Key>
                ))}
            </KeyRow>
        </Container>
    )
}

export default Keyboard
