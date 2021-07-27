import { Router } from 'express'

import auth from './auth'
import user from './user'
import games from './games'

const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/games', games)

export default router
