import { DefaultTheme } from 'styled-components'
import base from './base'

const theme: DefaultTheme = {
    name: 'pink',
    ...base,
    colors: {
        primary: 'hsl(340, 82%, 57%)',
        secondary: 'hsl(340, 15%, 52%)',
        text: 'hsl(0, 0%, 100%)',
        current: 'hsl(148, 48%, 43%)',
    },
}

export default theme
