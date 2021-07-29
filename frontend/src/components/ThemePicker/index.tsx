import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from 'providers/Theme'

import * as themes from 'themes'

import { Container, ThemeButton } from './styles'

const ThemePicker: React.FC = () => {
    const theme = useContext(ThemeContext)
    const [open, setOpen] = useState(false)
    const setTheme = useTheme()

    const handleSet = (name: string) => {
        setTheme(name)
        setOpen(!open)
    }

    return (
        <Container>
            {open &&
                Object.values(themes)
                    .sort((a, b) => (a.name === theme.name ? 1 : -1))
                    .map(t => {
                        return <ThemeButton key={t.name} onClick={() => handleSet(t.name)} color={t.colors.primary} />
                    })}
            {!open && <ThemeButton onClick={() => setOpen(!open)} color={theme.colors.primary} />}
        </Container>
    )
}

export default ThemePicker
