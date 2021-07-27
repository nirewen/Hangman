import { IUser } from 'database/models/User'

class Player {
    public id: string
    public user: IUser
    public guesses: string[]
    public score: number

    constructor(id: string, user: IUser) {
        this.id = id
        this.user = user

        this.guesses = []
        this.score = 0
    }
}

export default Player
