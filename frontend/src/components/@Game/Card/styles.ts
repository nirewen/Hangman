import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: grid;
    position: relative;
    padding: 1rem;
    grid-template-areas:
        'word word options'
        'players players options';
    grid-template-columns: auto auto 36px;
    background-color: ${({ theme }) => shade(0.15, theme.colors.primary)};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    gap: 1rem;
    margin-top: 2rem;
`

export const Code = styled.span`
    display: flex;
    align-items: center;

    position: absolute;
    padding: 8px;
    height: max-content;
    width: max-content;
    background-color: ${({ theme }) => shade(0.15, theme.colors.primary)};
    border-radius: 8px 8px 0 0;
    font-weight: 700;
    top: -2rem;
`

export const Content = styled.div`
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
        font-size: 1.2rem;
        letter-spacing: 8px;
    }

    &.players {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        grid-area: players;
        overflow-x: clip;
        padding: 0 5px;

        .player {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 0 0 4px ${({ theme }) => shade(0.2, theme.colors.primary)};

            &.current {
                box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.current};
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
`
