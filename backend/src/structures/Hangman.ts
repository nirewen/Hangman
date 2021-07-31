import { IUser } from '../database/models/User'
import Game from './Game'
import { GameError, PlayerError } from './types/Errors'
import Player from './types/Player'
import Word from './types/Word'
import GameState from './types/GameState'
import * as Words from './types/Words'

export class Hangman extends Game {
    public code: string
    public creator: Player
    public admin: Player
    public misses: string[] = []
    public guesses: string[] = []
    public word: Word = new Word('')
    public reconnectTimeout: NodeJS.Timeout

    constructor(code: string, socket: string, creator: IUser, word: string) {
        super()

        this.code = code
        this.creator = new Player(creator.id, creator)
        this.creator.socket = socket

        this.admin = this.creator
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

    removePlayer(id: string) {
        const player = this.queue.find(p => p.socket === id)

        if (!player) return

        this.queue.splice(this.queue.indexOf(player), 1)
    }

    setAdmin(id: string) {
        const admin = this.admin
        const player = this.queue.find(p => p.id === id)

        if (!player) return

        this.admin = player
        this.queue.splice(this.queue.indexOf(player), 1)
        this.addPlayer(admin.socket, admin.user)
    }

    addPlayer(socket: string, user: IUser) {
        const enqueued = this.queue.find(p => p.id === user.id)

        if (!enqueued) {
            let player = new Player(user.id, user)

            player.socket = socket

            this.queue.push(player)
            return player
        } else {
            enqueued.socket = socket

            return null
        }
    }

    setWord(word: string | Word) {
        this.word = word instanceof Word ? word : new Word(word)
    }

    revealWord() {
        this.word.letters.forEach(l => l.show())
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
            const guesses = this.word.letters.filter(l => l.valueOf() == letter)

            guesses.forEach(l => l.show())

            player.score += guesses.length
        } else this.misses.push(letter)

        if (this.misses.length >= 6) {
            this.revealWord()

            this.state.lost = true
            this.state.message = 'The man was hang'

            throw new GameError(this.state.message)
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

            this.revealWord()

            return true
        } else throw new PlayerError('Wrong word')
    }
}
