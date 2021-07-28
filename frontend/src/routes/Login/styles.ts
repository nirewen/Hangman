import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 20%;
    gap: 1rem;
`

export const Header = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
`

export const Methods = styled.div`
    display: flex;
    gap: 1rem;
`

interface Props {
    bg?: string
    color?: string
}

export const Method = styled.a<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 1rem 2rem;
    gap: 10px;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: ${props => props.bg || '#000000'};
    color: ${props => props.color || '#ffffff'};

    img {
        width: 64px;
        height: 64px;
    }
`
