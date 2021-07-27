export interface PlayerError extends Error {}
export interface GameState {
    win: boolean
    message: string
    started: boolean
}
