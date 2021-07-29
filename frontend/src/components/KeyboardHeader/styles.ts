import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    font-weight: 700;
    cursor: default;
    width: fit-content;
    height: 3rem;
    top: 50%;
    left: 50%;
    padding: 3rem 3rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translate(-50%, -50%);
    z-index: 1;
    gap: 8px;

    .user {
        --luminance: 45%;
    }
`
