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
            primary: string
            secondary: string
            title: string
            mono: string
        }
    }
}
