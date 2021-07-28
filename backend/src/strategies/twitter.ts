import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'

import { User } from '../database/models/User'

const {
    TWITTER_CONSUMER_KEY: consumerKey,
    TWITTER_CONSUMER_SECRET: consumerSecret,
    TWITTER_CALLBACK: callbackURL,
} = process.env

passport.use(
    new TwitterStrategy(
        {
            consumerKey,
            consumerSecret,
            callbackURL,
        },
        async (token, tokenSecret, profile, done) => {
            try {
                const { id, username, displayName } = profile
                const avatar = `https://unavatar.io/twitter/${username}`

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
