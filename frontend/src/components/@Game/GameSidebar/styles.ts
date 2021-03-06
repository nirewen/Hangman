import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-area: players;
`

export const Panel = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr;
    }
`

export const Users = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};

    .title {
        color: ${({ theme }) => shade(0.2, theme.colors.text)};
        font-weight: 700;
        font-size: 0.8rem;
    }
`
