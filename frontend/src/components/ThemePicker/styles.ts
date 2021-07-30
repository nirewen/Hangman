import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    border-radius: 8px;
`

export const ThemeButton = styled.div<{ color: string; current: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${({ current, color, theme }) => (current ? theme.colors.text : shade(0.3, color))};
    background-color: ${props => props.color};
`
