import { request } from '../request';
import { notification } from 'antd';

const actions = {
  getAll: async(store, filters) => {
    const reply = await request('GET', '/tickets', filters)
    if (reply.status) {
      store.setState({ tickets: reply.tickets, ticketsLoaded: true })
    } else {
      notification.error({
         message: 'Ticket List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  get: async(store, id) => {
    const reply = await request('GET', `/tickets/${id}`)
    if (reply.status) {
      store.setState({ ticket: reply.ticket })
    } else {
      notification.error({
         message: 'Ticket Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  add: async(store, client) => {
    const reply = await request('POST', '/tickets', client)
    if (!reply.status) {
      notification.error({
         message: 'Ticket Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
}

export default actions
