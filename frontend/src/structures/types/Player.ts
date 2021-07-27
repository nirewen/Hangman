import IUser from './User'

interface Player {
    id: string
    user: IUser
    guesses: string[]
    score: number
}

export default Player
