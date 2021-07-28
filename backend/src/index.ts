import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import Store from 'connect-mongo'
import { Server } from 'socket.io'

import routes from './routes'
import frontend from './frontend'
import { connect } from './database'

import events from './events/games'

declare module 'express-session' {
    interface SessionData {
        redirectTo: string
    }
}

const { PORT, SESSION_SECRET, MONGODB_URI } = process.env

require('./strategies/discord')

const mongoClient = connect()

const port = PORT || 9000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
)

app.use(
    session({
        secret: SESSION_SECRET!,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
        store: Store.create({ clientPromise: mongoClient }),
        name: 'discord-token',
    })
)
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === 'production') app.use(frontend)

app.use('/api', routes)

const server = app.listen(port, () => console.log('Listening on port ' + port))

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
})

io.on('connection', events)

export { io }

export default app
