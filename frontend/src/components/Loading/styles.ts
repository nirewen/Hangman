import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Container = styled.div`
    animation: ${spin} 2s linear infinite;
    grid-area: word;
    color: #ffffff;
    justify-self: center;
    height: max-content;
    width: max-content;
    font-size: 3rem;
`
