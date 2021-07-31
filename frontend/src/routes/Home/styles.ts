import styled from 'styled-components'
import { lighten, shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    margin: 5rem 0;
    width: 900px;
    height: calc(100vh - 10rem);
`

export const Landing = styled.div`
    display: grid;
    grid-template-columns: 49% 49%;
    gap: 2%;
    flex: 1;
    padding: 2rem;
    color: #000000;
    background-color: ${({ theme }) => lighten(0.05, theme.colors.primary)};
    width: 100%;
    height: 1px;
`

export const LoggedOut = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
`

export const Methods = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
`

export const Heading = styled.h1`
    display: flex;
    font-size: 1.3rem;
    font-family: ${({ theme }) => theme.fonts.secondary};
    color: ${({ theme }) => theme.colors.text};
`

export const User = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
`

export const Avatar = styled.img`
    width: 10rem;
    height: 10rem;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    border: 0.5rem solid ${({ theme }) => shade(0.2, theme.colors.primary)};
    border-radius: 50%;
`

export const Username = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => shade(0.1, theme.colors.text)};
`

export const Header = styled.h1`
    display: flex;
    flex-direction: column;
    grid-column: span 2;
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(0.15, theme.colors.primary)};
    border-radius: 10px 10px 0 0;
    width: 100%;
    padding: 10px;
    font-size: 2rem;
`

export const Button = styled.h3`
    font-size: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0.5rem;
    font-weight: 800;
    text-transform: uppercase;
`

export const Input = styled.input`
    font-size: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0.5rem;
    max-width: calc(9ch + 2rem);

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.text};
        font-weight: 800;
        text-transform: uppercase;
    }
`

export const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(0.15, theme.colors.primary)};
    border-radius: 0 0 10px 10px;
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
