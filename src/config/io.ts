import { Socket,Server } from 'socket.io'

module.exports = (httpServer: any) => {
  const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } })

  io.on('connection' , (socket: Socket) => {

    console.log('connected')

  })

  return
}
