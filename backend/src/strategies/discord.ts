import passport from 'passport'
import OAuth2Strategy from 'passport-oauth2'
import DiscordStrategy from 'passport-discord'

import { User } from '../database/models/User'

const parseAvatar = (id: string, { avatar, discriminator }: DiscordStrategy.Profile, size = 2048) => {
    const root = 'https://cdn.discordapp.com/'
    let link = `${root}`

    if (!avatar) link += `embed/avatars/${Number(discriminator) % 5}`
    else link += `avatars/${id}/${avatar}`

    if (avatar?.startsWith('a_')) link += '.gif'
    else link += '.png'

    link += `?size=${size}`

    return link
}

interface Environment extends NodeJS.ProcessEnv {
    CLIENT_ID: string
    CLIENT_SECRET: string
    CALLBACK_URL: string
}

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env as Environment

passport.serializeUser((user, done) => {
    done(null, (user as { id: string }).id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findOne({ id })

        return user ? done(null, user) : done(null, null)
    } catch (err) {
        console.error(err)

        return done(err, null)
    }
})

passport.use(
    new DiscordStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: ['identify'],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: DiscordStrategy.Profile,
            done: OAuth2Strategy.VerifyCallback
        ) => {
            try {
                const { id, username } = profile
                const avatar = parseAvatar(id, profile)

                let user = await User.findOneAndUpdate(
                    { id },
                    {
                        username,
                        avatar,
                    }
                )

                if (user) {
                    return done(null, user)
                } else {
                    user = await User.create({ id, username, avatar })

                    return done(null, user)
                }
            } catch (err) {
                console.error(err)

                return done(err)
            }
        }
    )
)

export default passport
