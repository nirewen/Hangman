import { DefaultTheme } from 'styled-components'
import base from './base'

const theme: DefaultTheme = {
    name: 'blue',
    ...base,
    colors: {
        primary: 'hsl(216, 68%, 47%)',
        secondary: 'hsl(216, 15%, 52%)',
        text: 'hsl(0, 0%, 100%)',
        current: 'hsl(148, 48%, 43%)',
    },
}

export default theme
