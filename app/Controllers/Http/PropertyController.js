'use strict'


const Property = use('App/Models/Property')
const Client = use('App/Models/Client')
const Address = use('App/Models/Address')
const Resident = use('App/Models/Resident')
const BaseController = use('./BaseController')
const MapService = use('App/Service/MapService')

const ExtraFaker = use('App/Service/ExtraFaker')
const PropertyFaker = use('App/Service/PropertyFaker')

const { sanitizor } = use('Validator')
const ace = require('@adonisjs/ace')

/**
 * Resourceful controller for interacting with properties
 */
const isZipCode = (zipStr) => {
  const zipPattern = /^[0-9]{5}(?:-[0-9]{4})?$/
  return zipPattern.test(zipStr)
}

class PropertyController extends BaseController {

  async index ({ request, response, view }) {
    let {
      search = '',
      sort = 'recent',
      order = 'asc',
      startcost = 0,
      endcost = 0,
      page = 1,
      limit = 10,
      radius = 50 // 50 kms radius if zip code searching
    } = request.all()

    limit = parseInt(limit || 10)
    page = parseInt(page || 0)
    const skip = parseInt(page - 1) * parseInt(limit || 50)

    let where, coords = {}

    let searchQuery = this._createSearchQuery(search, ['name', 'heading', 'description', 'location'])

    const zipCode = isZipCode(search) ? search : false

    if (zipCode) {

      coords = await MapService.getLatLngByZipCode(zipCode)

      if (coords) {
        where = {
          ...where,
          point: {
            $nearSphere: {
              $geometry: { type: 'Point', coordinates: [coords.lng, coords.lat] },
              $maxDistance: parseInt(radius) * 1000
            }
          }
        }
      }

    } else {
      where = { ...where, $or: searchQuery }
    }

    // COST FILTER
    startcost = parseInt(startcost)
    endcost = parseInt(endcost)

    if (startcost > 0 && endcost > 0) {
      where = { ...where, $and: [{ cost: { $gte: startcost } }, { cost: { $lte: endcost } }] }
    }

    if (startcost > 0 && endcost == 0) {
      where = { ...where, cost: { $gte: startcost } }
    }

    if (endcost > 0 && startcost == 0) {
      where = { ...where, cost: { $lte: endcost } }
    }

    // TAGS FILTER
    let tags = request.input('tags', false)
    if (tags) {
      where = { ...where, tags: { $in: tags.split('|') } }
    }

    // AMENITY FILTER
    let amenities = request.input('amenities', false)
    if (amenities) {
      where = { ...where, amenities: { $in: amenities.split('|') } }
    }

    // CARES FILTER
    let cares = request.input('cares', false)
    if (cares) {
      where = { ...where, typesOfCare: { $in: cares.split('|') } }
    }

    // ROOMS FILTER
    let rooms = request.input('rooms', false)
    if (rooms) {
      where = { ...where, roomTypes: { $in: rooms.split('|') } }
    }

    let orderBy = order == 'asc' ? 1 : -1
    let sortBy = { created_at: orderBy }

    switch (sort) {
      case 'popular':
        sortBy = { stays: orderBy }
        break;
      case 'price':
        sortBy = { cost: orderBy }
        break;
      default:
    }

    const total = await Property.count(where)
    const properties = await Property
      .find(where)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate('testimonials')
    return response.json({
      status: true,
      where,
      coords,
      zipCode,
      properties, page, limit,
      total, pages: Math.ceil(total / limit)
    })
  }

  async migrateProperty({ params, request, response }) {
    await ExtraFaker.generate()
    await PropertyFaker.generate(parseInt(request.input('count', 150)))
    return response.json({ status: true })
  }

  async getByClient({ params, request, response }) {
    const properties = await Property.find({ client: params.id })
    return response.json({ status: true, properties })
  }

  async store ({ auth, request, response }) {
    const propertyData = request.all()
    const property = await Property.create({
      ...propertyData,
      slug: sanitizor.slug(propertyData.name),
      cost: parseFloat(propertyData.cost),
      location: propertyData.location,
      address: newAddress._id.toString(),
      point: {
        type: 'Point',
        coordinates: [
          parseFloat(propertyData.longitude),
          parseFloat(propertyData.latitude)
        ]
      },
      addedBy: auth.user._id
    })
    return response.json({ status: true, property })
  }

  async show({ params, request, response, view }) {
    const property = await Property.findOne({ _id: params.id }).populate('testimonials')
    if (property) {
      return response.json({ status: true, property })
    }
    return response.status(404).json({ status: false })
  }

  async update({ params, request, response }) {
    const propertyData = request.all()
    const property = await Property.findOneAndUpdate({ _id: params.id }, propertyData, { new: true })
    if (property) {
      return response.json({ status: true, property })
    }
    return response.status(404).json({ status: false })
  }

  async destroy({ auth, params, request, response }) {
    // if (!auth.user.isAdmin) {
    //   return response.status(401).json({ status: false })
    // }
    await Property.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }

  // create by user
  async createByUser({ auth, params, request, response }) {
    const propertyData = request.all()

    const exists = await Property.findOne({ name: propertyData.name })
    if (exists) {
      return response
        .status(500)
        .json({ status: false, message: 'Property/Facility Name Already Exists' })
    }

    const property = await Property.create({
      ...propertyData,
      slug: sanitizor.slug(propertyData.name),
      cost: parseFloat(propertyData.cost),
      location: propertyData.location,
      point: {
        type: 'Point',
        coordinates: [
          parseFloat(propertyData.longitude),
          parseFloat(propertyData.latitude)
        ]
      },
      addedBy: auth.user._id,
      users: [auth.user._id]
    })
    return response.json({ status: true, property })
  }

  // update by user
  async updateByUser({ auth, params, request, response }) {
    const propertyData = request.all()

    const property = await Property.findOneAndUpdate(
      { _id: params.id, users: { $in: [auth.user._id] } },
      propertyData,
      { new: true }
    )

    if (property) {
      return response.json({ status: true, property })
    }
    return response
      .status(404)
      .json({ status: false, message: 'Property Not Found' })
  }

  // delete by user
  async deleteByUser({ auth, params, request, response }) {
    const property = await Property.findOneAndDelete(
      { _id: params.id, users: { $in: [auth.user._id] } }
    )
    if (property) {
      return response.json({ status: true, property })
    }
    return response
      .status(404)
      .json({ status: false, message: 'Property Not Found' })
  }

  // get all managed by user
  async getByUser({ auth, params, request, response }) {
    const properties = await Property.find(
      { users: { $in: [auth.user._id] } }
    )
    return response.json({ status: true, properties })
  }

  async addTestimony({ auth, params, request, response }) {
    const {
      name = '',
      message = '',
      photo = '',
      isFeat = false
    } = request.all()

    const property = await Property.findOneAndUpdate(
      { _id: params.id, users: { $in: [auth.user._id] } },
      { $push: { testimonials: { name, message, photo, isFeat } } },
      { new: true }
    )

    return response.json({ status: true, property })
  }

}

module.exports = PropertyController
