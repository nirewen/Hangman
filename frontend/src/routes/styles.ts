import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'navbar'
        'content';
    grid-template-rows: 56px auto;
    background-color: var(--accent-bg);
    height: 100vh;
    overflow: auto;
`
