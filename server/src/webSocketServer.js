import { WebSocketServer, WebSocket } from 'ws'
import jwt from 'jsonwebtoken'

// 创建webSocket服务
const wss = new WebSocketServer({ port: '3000' })

const types = {
  TOKEN_EXPIRED: 401,
  ERROR: 0,
  ALL: 1,
  SINGE: 2
}

wss.on('connection', (ws, req) => {
  const token = new URL(req.url, 'http://127.0.0.1:8080').searchParams.get('token')

  jwt.verify(token, '123456', (err, data) => {
    if (!err) {
      ws.user = data
      toAll(ws)
    } else {
      ws.send(createdMsg(types.ERROR))
    }
  })

  ws.on('close', () => {
    toAll(ws)
  })

  ws.on('message', (msg) => {
    msg = JSON.parse(msg.toString())
    console.log(ws.user)
    switch (msg.type) {
      case types.SINGE:
        toSinge(types.SINGE, msg.to, msg.value, ws)
        break
    }
  })
})

function createdMsg(type, user, data) {
  return JSON.stringify({
    type,
    user,
    data
  })
}

function toAll(ws) {
  const clients = Array.from(wss.clients)
  clients.forEach((client) => {
    client.send(createdMsg(types.ALL, null, { users: clients.map((item) => item.user), user: ws.user }))
  })
}

function toSinge(type, username, value, ws) {
  const clients = Array.from(wss.clients)
  const to = clients.find((client) => client.user.username === username)
  to.send(createdMsg(type, ws.user.username, value))
}
