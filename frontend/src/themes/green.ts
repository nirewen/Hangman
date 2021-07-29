import { DefaultTheme } from 'styled-components'
import base from './base'

const theme: DefaultTheme = {
    name: 'green',
    ...base,
    colors: {
        primary: 'hsl(123, 44%, 34%)',
        secondary: 'hsl(123, 15%, 52%)',
        text: 'hsl(0, 0%, 100%)',
        current: 'hsl(148, 48%, 43%)',
    },
}

export default theme
