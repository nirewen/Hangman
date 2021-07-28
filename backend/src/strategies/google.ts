import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { User } from '../database/models/User'

const { GOOGLE_CLIENT_ID: clientID, GOOGLE_CLIENT_SECRET: clientSecret, GOOGLE_CALLBACK_URL: callbackURL } = process.env

passport.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL,
            scope: ['profile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, photos } = profile
                const avatar = photos[0].value

                let user = await User.findOneAndUpdate(
                    { id },
                    {
                        username: displayName,
                        avatar,
                    }
                )

                if (user) {
                    return done(null, user)
                } else {
                    user = await User.create({ id, username: displayName, avatar })

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
