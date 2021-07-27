import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

export const connect = () =>
    mongoose.connect(MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
