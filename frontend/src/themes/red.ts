import { DefaultTheme } from 'styled-components'
import base from './base'

const theme: DefaultTheme = {
    name: 'red',
    ...base,
    colors: {
        primary: 'hsl(3, 65%, 53%)',
        secondary: 'hsl(3, 15%, 52%)',
        text: 'hsl(0, 0%, 100%)',
        current: 'hsl(148, 48%, 43%)',
    },
}

export default theme
