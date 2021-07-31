import styled from 'styled-components'
import { User } from 'providers/User'
import Hangman from 'structures/Hangman'
import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: keyboard;
    align-items: center;
    justify-content: center;
`

export const Guesses = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    padding: 0.7rem 2rem 1.4rem 2rem;
    margin-bottom: -1rem;
    border-radius: 1rem 1rem 0 0;
    font-family: ${({ theme }) => theme.fonts.secondary};
    color: ${({ theme }) => theme.colors.text};
    width: 748px;
    gap: 12px;
    overflow-x: clip;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    height: 70px;

    span {
        font-family: inherit;

        &.wrong {
            color: hsl(45, 100%, 50%);
        }
    }
`

interface Props {
    game: Hangman
    user: User
}

const current = ({ game: { state, queue, creator }, user }: Props, then: string, otherwise: string) => {
    const playing = queue[0]

    if (!playing || !state.started || state.lost) {
        if (user.id === creator.id) {
            if (queue.length > 0) {
                return otherwise
            } else {
                return otherwise
            }
        } else {
            return otherwise
        }
    }

    if (!playing) return otherwise

    if (playing.id !== user.id || state.win) {
        if (state.win) return otherwise

        return playing.id === user.id ? then : otherwise
    }

    return then
}

export const KeyboardContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-self: center;
    align-self: center;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    gap: 1rem;
    width: max-content;
    background-color: ${props => current(props, props.theme.colors.current, shade(0.3, props.theme.colors.secondary))};

    .keyboard {
        opacity: ${props => current(props, '1', '0.3')};
        cursor: ${props => current(props, 'default', 'not-allowed')};

        .key {
            cursor: ${props => current(props, 'pointer', 'not-allowed')};
        }
    }
`
