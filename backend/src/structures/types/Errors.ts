export class PlayerError extends Error {}
export class GameState {
    public started: boolean = false
    public win: boolean = false
    public message: string = ''
}
