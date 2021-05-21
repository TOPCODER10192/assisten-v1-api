import { request } from '../request';
import { notification } from 'antd';

const actions = {
  set: (store, client) => {
    store.setState({ client })
  },
  get: async(store, id) => {
    const reply = await request('GET', `/clients/${id}`)
    if (reply.status) {
      store.setState({ client: reply.client })
    } else {
      notification.error({
         message: 'Client Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  getAll: async(store, filters) => {
    const reply = await request('GET', '/clients', filters)
    if (reply.status) {
      store.setState({ clients: reply.clients, clientsLoaded: true })
    } else {
      notification.error({
         message: 'Client List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  add: async(store, client) => {
    const reply = await request('POST', '/clients', client)
    console.log("CREATE CLIENT", reply)
    if (!reply.status) {
      notification.error({
         message: 'Client Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
}

export default actions
