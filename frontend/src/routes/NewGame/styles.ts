import styled from 'styled-components'

export const Container = styled.div`
    /* mx-auto max-w-4xl p-12 flex flex-col min-h-full items-center */
    display: grid;
    grid-template-rows: 1fr 5fr 1fr;
    grid-area: content;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    gap: 3rem;
    padding: 0 20% 3rem 20%;
`

export const Header = styled.h1`
    font-weight: 600;
    font-size: 3rem;
    line-height: 1;
    color: #ffffff;
    text-transform: uppercase;
    padding: 2rem 0;
    justify-self: center;
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
    font-family: 'Roboto Mono';
    color: #ffffff;
    text-transform: uppercase;
    font-size: 4rem;
    justify-content: center;
    gap: 1rem;
`

export const PhraseInput = styled.textarea`
    width: 0;
    height: 0;
`

export const CreateButton = styled.button`
    padding: 1.25rem 4rem;
    color: #ffffff;
    border-radius: 0.7rem;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.1);
    justify-self: center;
`
