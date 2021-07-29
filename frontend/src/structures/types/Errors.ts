export interface PlayerError extends Error {}
export interface GameState {
    win: boolean
    lost: boolean
    message: string
    started: boolean
}
