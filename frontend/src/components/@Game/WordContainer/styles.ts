import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-area: word;
`

export const LetterRow = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    font-family: 'Roboto Mono';
    text-transform: uppercase;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 1rem;
    padding: 2.5rem 0;
`

export const State = styled.div<{ bg?: number[] }>`
    --bg: ${props => (props.bg ? `${props.bg[0]}, ${props.bg[1]}%, ${props.bg[2]}%` : '0, 60%, 50%')};

    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.75rem 1.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    background: hsl(var(--bg));
    font-weight: 700;
    border-radius: 1rem;
    top: 10%;

    svg {
        width: 30px;
        height: 30px;
    }
`
