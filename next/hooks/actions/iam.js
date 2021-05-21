import { request } from '../request';
import { notification } from 'antd';
import localstore from 'store';

const actions = {
  saveState: async(store) => {
    localstore.set('assisten-admin', store.state)
  },
  getAccount: async(store) => {
    const reply = await request('GET', '/v1/account')
    if (reply.status) {
      store.setState({ user: reply.user })
      store.actions.iam.saveState()
    }
  },
  login: async(store, credentials) => {
    const reply = await request('POST', '/admin/login', credentials)
    if (reply.status) {
      await store.actions.iam.getAccount()
    }
    return reply
  }
}

export default actions
