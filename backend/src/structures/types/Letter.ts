import * as Words from './Words'

class Letter {
    public letter: string
    public hidden: boolean

    constructor(letter: string) {
        this.letter = letter.toUpperCase()
        this.hidden = letter !== '\u3000'
    }

    show(value = true) {
        this.hidden = !value
    }

    valueOf() {
        return Words.clean(this.letter)
    }

    toString() {
        return this.hidden ? '\\_' : this.letter
    }
}

export default Letter
