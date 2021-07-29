import styled from 'styled-components'
import { lighten, shade } from 'polished'

interface Props {
    current?: boolean
}

export const Container = styled.div<Props>`
    --color: ${props => (props.current ? props.theme.colors.current : props.theme.colors.secondary)};

    display: flex;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${({ current, theme }) => (current ? theme.colors.current : theme.colors.secondary)};
    color: ${({ theme }) => theme.colors.text};
    gap: 5px;
    align-items: center;
    cursor: default;

    &:hover {
        background-color: ${({ current, theme }) =>
            lighten(0.03, current ? theme.colors.current : theme.colors.secondary)};
    }

    .name {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .score {
        padding: 0 6px;
        border-radius: 5px;
        background-color: ${({ current, theme }) =>
            shade(0.2, current ? theme.colors.current : theme.colors.secondary)};
        margin-left: auto;
    }
`

export const Avatar = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`
