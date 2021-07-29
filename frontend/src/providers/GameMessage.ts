import { createContext, useContext } from 'react'

export interface GameMessage {
    type: string
    value: string
}

interface Props {
    message: GameMessage
    setMessage(message: GameMessage): void
}

const GameMessageContext = createContext<Props>({} as Props)

export default GameMessageContext

export const useGameMessage = () => useContext(GameMessageContext)
