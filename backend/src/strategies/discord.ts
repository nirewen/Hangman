import passport from 'passport'
import DiscordStrategy from 'passport-discord'

import { User } from '../database/models/User'

const {
    DISCORD_CLIENT_ID: clientID,
    DISCORD_CLIENT_SECRET: clientSecret,
    DISCORD_CALLBACK_URL: callbackURL,
} = process.env

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
            clientID,
            clientSecret,
            callbackURL,
            scope: ['identify'],
        },
        async (accessToken, refreshToken, profile, done) => {
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
