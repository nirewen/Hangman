import { GameState } from './types/Errors'
import Player from './types/Player'

interface Game {
    queue: Player[]
    player: Player
    state: GameState
}

export default Game
