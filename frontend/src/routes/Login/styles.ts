import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 20%;
    gap: 1rem;
`

export const Header = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`
