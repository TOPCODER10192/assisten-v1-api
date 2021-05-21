import { request } from '../request';
import { notification } from 'antd';

const actions = {
  getAll: async(store, filters) => {
    const reply = await request('GET', '/timesheets', filters)
    if (reply.status) {
      store.setState({ timesheets: reply.timesheets, timesheetsLoaded: true })
    } else {
      notification.error({
         message: 'Timesheet List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  getByEmployee: async(store, employee) => {
    const reply = await request('GET', `employees/${employee._id}/timesheets`, filters)
    if (reply.status) {
      store.setState({ timesheets: reply.timesheets, timesheetsLoaded: true })
    } else {
      notification.error({
         message: 'Timesheet List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  add: async(store, user) => {
    const reply = await request('POST', '/timesheets', user)
    if (!reply.status) {
      notification.error({
         message: 'Timesheet Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
}

export default actions
