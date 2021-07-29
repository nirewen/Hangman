import styled from 'styled-components'

export const Container = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto Mono';
    border-bottom: 4px solid ${({ theme }) => theme.colors.text};
    margin: 0 0.25rem;
    padding: 4px 0.1em;
    text-align: center;
`
