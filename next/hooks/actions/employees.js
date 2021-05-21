import { request } from '../request';
import { notification } from 'antd';

const actions = {
  set: (store, client) => {
    store.setState({ client })
  },
  get: async(store, id) => {
    const reply = await request('GET', `/employees/${id}`)
    if (reply.status) {
      store.setState({ employee: reply.client })
    } else {
      notification.error({
         message: 'Employee Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  getAll: async(store, filters) => {
    const reply = await request('GET', '/employees', filters)
    if (reply.status) {
      store.setState({ employees: reply.employees, employeesLoaded: true })
    } else {
      notification.error({
         message: 'Employee List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  add: async(store, client) => {
    const reply = await request('POST', '/employees', client)
    if (!reply.status) {
      notification.error({
         message: 'Employee Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
}

export default actions
