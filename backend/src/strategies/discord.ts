import passport from 'passport'
import OAuth2Strategy from 'passport-oauth2'
import DiscordStrategy from 'passport-discord'

import { User } from '../database/models/User'

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
                const { id, username, discriminator, avatar } = profile

                let user = await User.findOneAndUpdate(
                    { id },
                    {
                        username,
                        discriminator,
                        avatar,
                    }
                )

                if (user) {
                    return done(null, user)
                } else {
                    user = await User.create({ id, username, discriminator, avatar })

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
