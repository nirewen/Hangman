import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'

const router = Router()

const storeRedirect = (req: Request, res: Response, next: NextFunction) => {
    const { redirectTo } = req.query

    if (!req.session.redirectTo) req.session.redirectTo = (redirectTo as string) || ''

    next()
}

router.get('/discord', storeRedirect, passport.authenticate('discord'), (req: Request, res: Response) => {
    res.redirect(`http://${req.hostname}${req.session.redirectTo}`)

    req.session.redirectTo = null
})

router.get('/twitter', storeRedirect, passport.authenticate('twitter'), (req: Request, res: Response) => {
    res.redirect(`http://${req.hostname}${req.session.redirectTo}`)

    req.session.redirectTo = null
})

router.get('/google', storeRedirect, passport.authenticate('google'), (req: Request, res: Response) => {
    res.redirect(`http://${req.hostname}${req.session.redirectTo}`)

    req.session.redirectTo = null
})

export default router
