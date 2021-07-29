import { DefaultTheme } from 'styled-components'
import base from './base'

const theme: DefaultTheme = {
    name: 'yellow',
    ...base,
    colors: {
        primary: 'hsl(37, 100%, 51%)',
        secondary: 'hsl(37, 15%, 52%)',
        text: 'hsl(0, 0%, 100%)',
        current: 'hsl(148, 48%, 43%)',
    },
}

export default theme
