import styled from 'styled-components'
import { shade } from 'polished'

interface Props {
    bg?: string
    color?: string
}

export const Container = styled.a<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 2rem 1rem 2rem;
    gap: 10px;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: ${props => props.bg || shade(0.5, props.theme.colors.primary)};
    color: ${props => props.color || props.theme.colors.text};

    svg {
        width: 64px;
        height: 64px;
    }
`
