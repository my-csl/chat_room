import Router from 'koa-router'

import userRouter from './user.router.js'

const rootRouter = new Router()

rootRouter.use(userRouter.routes())

export default rootRouter
