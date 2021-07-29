import { createContext, useContext } from 'react'
import Hangman from 'structures/Hangman'

interface GameAttributes {
    code: string
    game: Hangman
}

const GameContext = createContext<GameAttributes>({} as GameAttributes)

export default GameContext

export const useGame = () => useContext(GameContext)
