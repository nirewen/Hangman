import Game from './Game'
import Player from './types/Player'
import Word from './types/Word'

interface Hangman extends Game {
    code: string
    creator: Player
    admin: Player
    misses: string[]
    guesses: string[]
    word: Word
}

export default Hangman
