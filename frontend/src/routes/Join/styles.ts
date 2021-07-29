import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    padding: 2rem 20%;
`
