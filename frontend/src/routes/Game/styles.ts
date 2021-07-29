import styled from 'styled-components'
import { User } from 'providers/User'
import Hangman from 'structures/Hangman'
import { shade } from 'polished'

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'man word players'
        'man keyboard players';
    grid-template-columns: 5fr 15fr 5fr;
    grid-template-rows: 5fr 2fr;
    grid-area: content;
    min-height: 100%;
    padding: 2rem 4rem;
    justify-content: center;
    gap: 1rem;
`

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: man;
`

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-area: players;
`

export const Panel = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr;
    }
`

export const GameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    gap: 10px;
    justify-content: space-between;
`

export const Middle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-area: word;
`

export const LetterRow = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    font-family: 'Roboto Mono';
    text-transform: uppercase;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 1rem;
    padding: 2.5rem 0;
`

export const KeyboardArea = styled.div`
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
    font-family: 'Rubik Mono One';
    color: ${({ theme }) => theme.colors.text};
    width: 748px;
    gap: 12px;
    overflow-x: clip;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    height: 70px;

    .wrong {
        color: hsl(45, 100%, 50%);
    }
`

interface Props {
    game: Hangman
    user: User
}

const current = ({ game: { state, queue, creator }, user }: Props, then: string, otherwise: string) => {
    const playing = queue[0]

    if (!state.started) {
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
    background-color: ${props => current(props, props.theme.colors.current, shade(0.4, props.theme.colors.secondary))};

    .keyboard {
        opacity: ${props => current(props, '1', '0.3')};
        cursor: ${props => current(props, 'default', 'not-allowed')};

        .key {
            cursor: ${props => current(props, 'pointer', 'not-allowed')};
        }
    }
`

export const Users = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);

    .title {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        font-size: 0.8rem;
    }
`

export const State = styled.div<{ bg?: number[] }>`
    --bg: ${props => (props.bg ? `${props.bg[0]}, ${props.bg[1]}%, ${props.bg[2]}%` : '0, 60%, 50%')};

    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.75rem 1.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    background: hsl(var(--bg));
    font-weight: 700;
    border-radius: 1rem;
    top: 10%;
`

export const GameCard = styled.div`
    display: grid;
    position: relative;
    padding: 1rem;
    grid-template-areas: 'word word players players options';
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    gap: 1rem;
    margin-top: 2rem;

    .code {
        display: flex;
        align-items: center;

        position: absolute;
        padding: 8px;
        height: max-content;
        width: max-content;
        background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
        border-radius: 8px 8px 0 0;
        font-weight: 700;
        top: -2rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;

        &.word {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            grid-area: word;
            font-size: 1.5rem;
            letter-spacing: 8px;
        }

        &.players {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            grid-area: players;

            .player {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: 0 0 0 4px ${({ theme }) => shade(0.2, theme.colors.primary)};

                &.current {
                    box-shadow: 0 0 0 4px rgb(57, 162, 106);
                }
            }
            .player + .player {
                margin-left: -20px;
            }
        }

        &.options {
            display: flex;
            flex-direction: column;
            grid-area: options;
        }
    }
`
