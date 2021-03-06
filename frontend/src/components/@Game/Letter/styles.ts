import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 4px solid ${({ theme }) => theme.colors.text};
    padding: 0.1em;
    text-align: center;

    span {
        font-family: ${({ theme }) => theme.fonts.mono};
        width: 1ch;
        margin: 0 0.25rem;
    }
`
