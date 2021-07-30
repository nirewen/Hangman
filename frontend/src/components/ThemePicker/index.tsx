import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from 'providers/Theme'

import * as themes from 'themes'

import { Container, ThemeButton } from './styles'

const ThemePicker: React.FC = () => {
    const theme = useContext(ThemeContext)
    const setTheme = useTheme()

    return (
        <Container>
            {Object.values(themes).map(t => {
                return (
                    <ThemeButton
                        key={t.name}
                        current={theme.name === t.name}
                        onClick={() => setTheme(t.name)}
                        color={t.colors.primary}
                    />
                )
            })}
        </Container>
    )
}

export default ThemePicker
