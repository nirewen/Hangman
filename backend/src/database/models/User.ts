import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface IUser extends Document {
    id: string
    username: string
    discriminator: string
    avatar: string
}

const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
})

export const User: Model<IUser> = mongoose.models.User || model('User', UserSchema)
