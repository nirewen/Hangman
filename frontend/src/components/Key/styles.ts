import styled from 'styled-components'

interface Props {
    disabled?: boolean
}

export const Container = styled.div<Props>`
    padding: 1rem 1rem;
    line-height: 2rem;
    font-family: 'Rubik Mono One';
    font-size: 2.25rem;
    font-weight: 400;
    color: #ffffff;
    border-radius: 0.7rem;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`
