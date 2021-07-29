import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { shade } from 'polished'

export const Container = styled.nav`
    display: flex;
    grid-area: navbar;
    padding: 10px 4rem;
    justify-content: space-between;
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.text};
    position: sticky;
    top: 0;

    > div {
        display: flex;
        align-items: center;
        gap: 18px;
    }

    .game-name {
        font-family: ${({ theme }) => theme.fonts.default};
        font-size: 1.2rem;
    }
`

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    padding: 8px 10px;
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    border-radius: 10px;
    cursor: pointer;

    img {
        border-radius: 50%;
    }
`
