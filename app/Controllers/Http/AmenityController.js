'use strict'

const Amenity = use('App/Models/Amenity')

/**
 * Resourceful controller for interacting with amenities
 */
class AmenityController {

  async index ({ request, response }) {
    const amenities = await Amenity.find({})
    return response.json({ status: true, amenities })
  }

  async store ({ request, response }) {
    const data = request.only(['name'])
    const amenity = await Amenity.create(data)
    return response.json({ status: true, amenity })
  }

  async show ({ params, request, response, view }) {
    const amenity = await Amenity.findOne({ _id: params.id })
    if (amenity) {
      return response.json({ status: true, amenity })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const amenity = await Amenity.findOneAndUpdate({ _id: params.id }, request.all(), { new: true })
    if (amenity) {
      return response.json({ status: true, amenity })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Amenity.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = AmenityController
