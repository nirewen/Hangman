import React, { createContext, useContext } from 'react'
import { DefaultTheme, ThemeProvider as Provider } from 'styled-components'
import usePersistentState from 'hooks/usePersistentState'

import blue from 'themes/blue'

const ThemeContext = createContext<React.Dispatch<React.SetStateAction<DefaultTheme>>>(() => {})

const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = usePersistentState<DefaultTheme>('theme', blue)

    return (
        <ThemeContext.Provider value={setTheme}>
            <Provider theme={theme}>{children}</Provider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
