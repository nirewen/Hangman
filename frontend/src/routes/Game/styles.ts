import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'man word players'
        'man keyboard players';
    grid-template-columns: 5fr 15fr 5fr;
    grid-template-rows: 5fr 2fr;
    min-height: 100%;
    padding: 2rem 4rem;
    justify-content: center;
    gap: 1rem;
`
