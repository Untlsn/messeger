import { Socket } from 'socket.io';

interface Message {
  type: string,
  payload: any
}

const emails: Record<string, string[]|undefined> = {

}

const ids: Record<string, string|undefined> = {

}

export const messages = (socket: Socket) => {

  socket.on('message', ({ type, payload }: Message) => {
    switch (type) {
      case 'login': {
        if (!emails[payload]) emails[payload] = [];
        emails[payload].push(socket.id);
        ids[socket.id] = payload;

        break;
      }
      case 'message': {
        const { message, to } = payload;

        if (!emails[to]?.length) {
          socket.to(socket.id).emit('message', { type: 'message-error', payload: 'purpose dont exist' })
          break;
        }

        emails[to].forEach(id => {
          socket.to(id).emit('message', { type: 'message', payload: { from: ids[socket.id], message } })
        })
      }
    }
  })

  socket.on('disconnect', () => {
    const login = ids[socket.id];
    delete ids[socket.id];
    emails[login] = emails[login]?.filter(id => id != socket.id);
  })
}