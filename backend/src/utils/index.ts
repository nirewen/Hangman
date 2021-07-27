const en = require('nanoid-good/locale/en')
const pt = require('nanoid-good/locale/pt')

const nanoid = require('nanoid-good').customAlphabet(en, pt)

const abc = 'abcdefghijklmnopqrstuvwxyz'

export const genId: () => string = () => nanoid(abc + abc.toUpperCase(), 6)()
