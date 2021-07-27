import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    align-items: center;
    overflow: auto;
    gap: 5rem;
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20%;
`

export const Header = styled.h1`
    display: flex;
    flex-direction: column;
    font-family: 'Rubik Mono One';
    font-size: 3rem;
    text-align: center;
    color: #ffffff;

    span {
        font-size: 6rem;
    }
`

export const Instructions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
    background-color: rgba(0, 0, 0, 0.05);
`

export const Button = styled.h3`
    font-size: 2rem;
    padding: 1rem 2rem;
    background-color: rgba(0, 0, 0, 0.1);
    font-family: 'Rubik Mono One';
    color: #ffffff;
    border-radius: 1rem;
`
