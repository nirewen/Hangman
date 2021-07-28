import mongoose from 'mongoose'

const { MONGODB_PASS } = process.env

const MONGODB_URI = `mongodb+srv://admin:${MONGODB_PASS}@hang0.kik3z.mongodb.net/hangman?retryWrites=true&w=majority`

export const connect = () =>
    mongoose
        .connect(MONGODB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(m => m.connection.getClient())
