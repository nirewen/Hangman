import styled from 'styled-components'

interface Props {
    current?: boolean
}

export const Container = styled.div<Props>`
    --luminance: 52%;
    --current-luminance: 43%;

    display: flex;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${props =>
        props.current ? 'hsl(148, 48%, var(--current-luminance))' : 'hsl(216, 15%, var(--luminance))'};
    color: #ffffff;
    gap: 5px;
    align-items: center;
    cursor: default;

    &:hover {
        --luminance: ;
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
        background-color: ${props =>
            props.current
                ? 'hsl(148, 48%, calc(var(--current-luminance) - 5%))'
                : 'hsl(216, 15%, calc(var(--luminance) - 5%))'};
        margin-left: auto;
    }
`

export const Avatar = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`
