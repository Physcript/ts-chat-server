import { Socket,Server } from 'socket.io'
import { _IUser } from '../interface/user'

module.exports = (httpServer: any) => {
  const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } })
  const online_list: _IUser[] = []

  io.on('connection' , (socket: Socket) => {

    console.log('connected')
    
    socket.on('message', (data) => {
      io.emit('rm', ({ data })) 
    })
    socket.on('get_online_user', () => {
      console.log('get_online_user')
      io.emit('online_user', { data: 2 })
    })

    socket.on('login' , (data: any) => {
      const { uid } = data.USER
      const USER = data.USER
      
      const isLoginAlready = online_list.some( user => user.uid === uid )
      
      if(isLoginAlready)
        {

        }
      else
        {
          online_list.push(USER)
        }
      
    })// end of socket login
    socket.on('logout', (data) => {

    })// end of socket logout

    socket.on('get_online_list', () => {
      io.emit('online_list', ({ data: online_list }))
    })
  })

}
