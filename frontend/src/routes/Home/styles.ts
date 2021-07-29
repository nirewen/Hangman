import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    align-items: center;
    gap: 3rem;
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20%;
    gap: 5rem;
`

export const Header = styled.h1`
    display: flex;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.default};
    font-size: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};

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
    background-color: ${({ theme }) => shade(0.05, theme.colors.primary)};
`

export const Button = styled.h3`
    font-size: 2rem;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    font-family: ${({ theme }) => theme.fonts.default};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 1rem;
`

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    margin-top: -3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    width: 100%;
    gap: 18px;

    div {
        display: flex;
        gap: 8px;
    }

    span,
    a {
        display: flex;
        align-items: center;
        height: 40px;
        gap: 5px;
    }

    a {
        padding: 5px 10px;
        background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
        border-radius: 8px;

        .avatar {
            height: 24px;
            border-radius: 50%;
        }

        svg {
            height: 14px;

            g[data-name='Wordmark'] {
                fill: ${({ theme }) => theme.colors.text};
            }
        }
    }
`
