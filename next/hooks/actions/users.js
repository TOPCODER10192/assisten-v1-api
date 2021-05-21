import { request } from '../request';
import { notification } from 'antd';

const actions = {
  get: async(store, filters) => {
    const reply = await request('GET', '/users', filters)
    if (reply.status) {
      store.setState({ users: reply.users, usersLoaded: true })
    } else {
      notification.error({
         message: 'User List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  add: async(store, user) => {
    const reply = await request('POST', '/users', user)
    if (!reply.status) {
      notification.error({
         message: 'User Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
  remove: async(store, userId) => {
    const reply = await request('DELETE', `/users/${userId}`)
    if (!reply.status) {
      notification.error({
         message: 'User Deletion Failed',
         description: reply.message
      })
    }
    return reply.status
  }
}

export default actions
