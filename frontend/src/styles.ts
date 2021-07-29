import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .Modal {
        position: absolute;
        display: flex;
        max-height: 100vh;
        width: 100%;
        justify-content: center;
    }

    .Modal:focus {
        outline: none;
    }

    .Overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    }
`
