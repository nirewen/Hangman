import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: grid;
    position: relative;
    padding: 1rem;
    grid-template-areas: 'word word players players options';
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
`
