import React, { createContext, useContext, useEffect } from 'react'
import { DefaultTheme, ThemeProvider as Provider } from 'styled-components'
import usePersistentState from 'hooks/usePersistentState'

import * as themes from 'themes'

type Themes = { [key: string]: DefaultTheme }

const ThemeContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {})

const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = usePersistentState('theme', themes.blue.name)

    useEffect(() => {
        if (!(themes as Themes)[theme]) {
            setTheme(themes.blue.name)
        }
    }, [theme, setTheme])

    return (
        <ThemeContext.Provider value={setTheme}>
            <Provider theme={(themes as Themes)[theme] || themes.blue}>{children}</Provider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
