import { IUser } from '../database/models/User'
import Game from './Game'
import { GameState, PlayerError } from './types/Errors'
import Player from './types/Player'
import Word from './types/Word'
import * as Words from './types/Words'

export class Hangman extends Game {
    public code: string
    public creator: Player
    public misses: string[] = []
    public guesses: string[] = []
    public word: Word = new Word('')

    constructor(code: string, creator: IUser, word: string) {
        super()

        this.code = code
        this.creator = new Player(creator.id, creator)
        this.setWord(word)
    }

    get man() {
        return `https://raw.githubusercontent.com/nirewen/Tyrone/master/src/img/hangman/${this.misses.length}.png`
    }

    get win() {
        return this.word.letters.filter(l => l.hidden).length < 1
    }

    reset() {
        this.state = new GameState()
        this.guesses = []
        this.misses = []
        this.queue.forEach(p => (p.score = 0))
    }

    addPlayer(id: string, user: IUser) {
        if (!this.queue.find(p => p.id === id)) {
            let player = new Player(id, user)

            this.queue.push(player)
            return player
        } else return null
    }

    setWord(word: string | Word) {
        this.word = word instanceof Word ? word : new Word(word)
    }

    play(letter: string, player = this.player) {
        letter = Words.clean(letter.toUpperCase())

        if (!letter) throw new PlayerError('Invalid letter')

        if (letter.length > 1) throw new PlayerError('Only one letter at a time')

        if (this.guesses.includes(letter)) throw new PlayerError('Letter already played')
        else {
            this.guesses.push(letter)
            player.guesses.push(letter)
        }

        if (this.word.letters.find(l => l.valueOf() == letter)) {
            this.word.letters.filter(l => l.valueOf() == letter).forEach(l => l.show())
            player.score += 10
        } else this.misses.push(letter)

        if (this.misses.length >= 6) {
            this.word.letters.forEach(l => l.show())

            this.state.message = 'The man was hang'

            throw this.state
        }

        if (this.win) {
            this.state.win = true
            this.state.message = 'Game won'

            return true
        }

        return false
    }

    guess(word: string, player: Player) {
        word = word.toUpperCase()

        if (word.length !== this.word.length) throw new PlayerError("Word size doesn't match")

        if (word == this.word.valueOf()) {
            player.score += 100

            this.word.letters.forEach(l => l.show())

            return true
        } else throw new PlayerError('Wrong word')
    }
}
