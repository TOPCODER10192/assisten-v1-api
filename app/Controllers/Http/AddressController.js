'use strict'

const Address = use('App/Models/Address')

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {

  async index ({ request, response }) {
    const addresses = await Address.find({})
    return response.json({ status: true, addresses })
  }

  async searchByLngLat({ request, response }) {
    const { latitude = 0, longitude = 0 } = request.all()
    let coords = { type: 'Point', coordinates: [longitude, latitude] }
    let where = {
      location: {
        $nearSphere: {
           $geometry: coords,
           $maxDistance: 3000
        }
      }
    }
    const addresses = await Address.find(where)
    return response.json({ status: true, addresses })
  }

  async store ({ request, response }) {
    const data = request.only(['name'])
    const address = await Address.create(data)
    return response.json({ status: true, address })
  }

  async show ({ params, request, response, view }) {
    const address = await Address.findOne({ _id: params.id })
    if (address) {
      return response.json({ status: true, address })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const address = await Address.findOneAndUpdate({ _id: params.id }, request.all(), { new: true })
    if (address) {
      return response.json({ status: true, address })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Address.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = AddressController
