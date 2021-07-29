import { createContext, useContext } from 'react'

export interface InternalState {
    defining?: boolean
    guessing?: boolean
    joined?: boolean
}

interface Props {
    state: InternalState
    setState?(state: InternalState): void
}

const GameStateContext = createContext<Props>({} as Props)

export default GameStateContext

export const useGameState = () => useContext(GameStateContext)
