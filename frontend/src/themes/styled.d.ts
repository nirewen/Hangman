import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        name: string

        colors: {
            primary: string
            secondary: string
            text: string
            current: string
        }

        fonts: {
            content: string
            default: string
            mono: string
        }
    }
}
