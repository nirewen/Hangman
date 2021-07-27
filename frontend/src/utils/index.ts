const accents = {
    ae: 'ä|æ|ǽ',
    oe: 'ö|œ',
    ue: 'ü',
    Ae: 'Ä',
    Ue: 'Ü',
    Oe: 'Ö',
    A: 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ',
    a: 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª',
    C: 'Ç|Ć|Ĉ|Ċ|Č',
    c: 'ç|ć|ĉ|ċ|č',
    D: 'Ð|Ď|Đ',
    d: 'ð|ď|đ',
    E: 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě',
    e: 'è|é|ê|ë|ē|ĕ|ė|ę|ě',
    G: 'Ĝ|Ğ|Ġ|Ģ',
    g: 'ĝ|ğ|ġ|ģ',
    H: 'Ĥ|Ħ',
    h: 'ĥ|ħ',
    I: 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ',
    i: 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı',
    J: 'Ĵ',
    j: 'ĵ',
    K: 'Ķ',
    k: 'ķ',
    L: 'Ĺ|Ļ|Ľ|Ŀ|Ł',
    l: 'ĺ|ļ|ľ|ŀ|ł',
    N: 'Ñ|Ń|Ņ|Ň',
    n: 'ñ|ń|ņ|ň|ŉ',
    O: 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ',
    o: 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º',
    R: 'Ŕ|Ŗ|Ř',
    r: 'ŕ|ŗ|ř',
    S: 'Ś|Ŝ|Ş|Š',
    s: 'ś|ŝ|ş|š|ſ',
    T: 'Ţ|Ť|Ŧ',
    t: 'ţ|ť|ŧ',
    U: 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ',
    u: 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ',
    Y: 'Ý|Ÿ|Ŷ',
    y: 'ý|ÿ|ŷ',
    W: 'Ŵ',
    w: 'ŵ',
    Z: 'Ź|Ż|Ž',
    z: 'ź|ż|ž',
    AE: 'Æ|Ǽ',
    ss: 'ß',
    IJ: 'Ĳ',
    ij: 'ĳ',
    OE: 'Œ',
    f: 'ƒ',
}

export const clean = (str: string) => {
    for (let [i, accent] of Object.entries(accents)) {
        str = str.replace(new RegExp(accent, 'g'), i)
    }

    return str
}

export const validate = (word: string) => {
    return word.replace(/[^A-Z\u00C0-\u017F]/g, '')
}

export const parseAvatar = (id: string, avatar: string, size = 2048) => {
    let BASE_URL = `https://cdn.discordapp.com/avatars/${id}/${avatar}`

    if (avatar.startsWith('a_')) BASE_URL += '.gif'
    else BASE_URL += '.png'

    BASE_URL += `?size=${size}`

    return BASE_URL
}
