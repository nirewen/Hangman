import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.nav`
    display: flex;
    align-items: center;
    grid-area: navbar;
    padding: 10px 4rem;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.1);
    color: #ffffff;
    position: sticky;
    top: 0;

    .game-name {
        font-family: 'Rubik Mono One';
        font-size: 1.2rem;
    }
`

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    cursor: pointer;

    img {
        border-radius: 50%;
    }
`
