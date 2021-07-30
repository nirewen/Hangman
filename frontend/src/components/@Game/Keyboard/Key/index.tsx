import React from 'react'
import { Container } from './styles'

interface Props {
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Key: React.FC<Props> = ({ disabled, onClick, children }) => {
    return (
        <Container
            className={`notranslate ${disabled ? 'disabled' : 'key'}`}
            onClick={e => !disabled && onClick && onClick(e)}
        >
            {children}
        </Container>
    )
}

export default Key
