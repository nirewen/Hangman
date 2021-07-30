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
    padding: 1rem 1rem 1rem 1rem;
    height: max-content;
    gap: 10px;
    border-radius: 15px;
    font-weight: 700;
    background-color: ${props => props.bg || shade(0.5, props.theme.colors.primary)};
    color: ${props => props.color || props.theme.colors.text};

    svg {
        width: 64px;
        height: 64px;
    }
`
