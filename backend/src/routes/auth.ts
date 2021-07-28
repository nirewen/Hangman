import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'

const router = Router()

const storeRedirect = (req: Request, res: Response, next: NextFunction) => {
    const { redirectTo } = req.query

    req.session.redirectTo = (redirectTo as string) || ''

    next()
}

router.get('/discord', storeRedirect, passport.authenticate('discord'), (req: Request, res: Response) => {
    res.redirect(`http://${req.hostname}${req.session.redirectTo}`)

    req.session.redirectTo = ''
})

export default router
