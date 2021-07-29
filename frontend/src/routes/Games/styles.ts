import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 20%;
    gap: 1rem;

    > span {
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.fonts.content};
        font-size: 2rem;
    }

    h3 {
        font-size: 1.5rem;
    }
`
