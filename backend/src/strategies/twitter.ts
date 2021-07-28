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
            console.log(profile)
            // User.findOneAndUpdate({ twitterId: profile });
        }
    )
)

export default passport
