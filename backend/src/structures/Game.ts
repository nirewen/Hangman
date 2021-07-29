import GameState from './types/GameState'
import Player from './types/Player'

class Game {
    public queue: Player[] = []
    public state: GameState = new GameState()

    get player() {
        return this.queue[0]
    }

    async next() {
        this.queue.push(this.queue.shift()!)
        return this.player.user
    }
}

export default Game
