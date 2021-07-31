import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 5fr 1fr;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    gap: 3rem;
    padding: 3rem 0;
`

export const Header = styled.h1`
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 3rem;
    line-height: 1;
    color: #ffffff;
    text-transform: uppercase;
    padding: 2rem 0;
    justify-self: center;
    text-align: center;
`

export const Letters = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const LetterRow = styled.div`
    display: flex;
    flex: 0;
    flex-wrap: wrap;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    font-size: 3rem;
    justify-content: center;
    gap: 1rem;
`

export const PhraseInput = styled.textarea`
    width: 0;
    height: 0;
`

export const CreateButton = styled.button`
    padding: 1.25rem 4rem;
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0.7rem;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    width: max-content;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    justify-self: center;
`
