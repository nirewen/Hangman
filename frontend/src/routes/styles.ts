import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-rows: auto;
    background-color: ${({ theme }) => theme.colors.primary};
    height: 100vh;
`
