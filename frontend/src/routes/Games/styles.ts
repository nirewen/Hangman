import styled from 'styled-components'

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    gap: 1rem;

    > span {
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.fonts.content};
        font-size: 2rem;
    }

    h3 {
        font-size: 1rem;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 0 1rem;
    overflow-y: auto;
    border-radius: 10px;
    gap: 1rem;

    > span {
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.fonts.content};
        font-size: 2rem;
    }

    h3 {
        font-size: 1rem;
    }
`

export const Header = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    position: sticky;
    top: 0;
    padding: 1rem 0;
    z-index: 1;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`
