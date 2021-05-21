import { request } from '../request';
import { notification } from 'antd';

const actions = {
  getAllByClient: async(store, id, filters) => {
    const reply = await request('GET', `/client/${id}/properties`, filters)
    if (reply.status) {
      store.setState({ properties: reply.properties, propertiesLoaded: true })
    } else {
      notification.error({
         message: 'Property List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  getAll: async(store, filters) => {
    const reply = await request('GET', '/properties', filters)
    if (reply.status) {
      store.setState({ properties: reply.properties, propertiesLoaded: true })
    } else {
      notification.error({
         message: 'Property List Failed',
         description: reply.message
       })
    }
    return reply.status
  },
  get: async(store, propertyId) => {
    const property = store.state.properties.find(p => p._id == propertyId)
    if (property) {
      return property
    } else {
      const reply = await request('GET', `/properties/${propertyId}`)
      if (reply.status) {
        return reply.property
      }
      return false
    }
  },
  add: async(store, property) => {
    const reply = await request('POST', '/properties', property)
    console.log("REPLY", reply)
    if (!reply.status) {
      notification.error({
         message: 'Property Creation Failed',
         description: reply.message
      })
    }
    return reply.status
  },
  getExtras: async(store, property) => {
    const reply = await request('GET', '/v1/extras')
    if (reply.status) {
      store.setState({
        amenities: reply.amenities,
        careTypes: reply.careTypes,
        roomTypes: reply.roomTypes
      })
    }
    return reply.status
  }
}

export default actions
