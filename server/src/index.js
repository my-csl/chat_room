import Koa from 'koa'
import bodyParase from 'koa-bodyparser'
import cors from '@koa/cors'

import router from './router/index.js'
import './webSocketServer.js'

const app = new Koa()

// 添加body参数解析
app.use(bodyParase())

// 设置cors
app.use(
  cors({
    origin: 'http://127.0.0.1:5500'
  })
)

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, () => {
  console.log('服务启动成功')
})
