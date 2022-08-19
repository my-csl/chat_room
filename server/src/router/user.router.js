import Router from 'koa-router'
import jwt from 'jsonwebtoken'

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', (ctx, next) => {
  ctx.body = 'user'
})

userRouter.post('/login', (ctx, next) => {
  const { username, password } = ctx.request.body
  const token = jwt.sign({ username }, '123456', {
    algorithm: 'HS256',
    expiresIn: '10h'
  })

  ctx.body = {
    ok: 1,
    token
  }
})

export default userRouter
