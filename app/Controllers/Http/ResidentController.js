'use strict'

const Resident = use('App/Models/Resident')
const User = use('App/Models/User')
const Property = use('App/Models/Property')
const Hash = use('Hash')
const { sanitizor } = use('Validator')

/**
 * Resourceful controller for interacting with residents
 */
class ResidentController {

  async index ({ request, response }) {
    const residents = await Resident.find({ })
    return response.json({ status: true, residents })
  }

  async getByProperty({ params, request, response }) {
    const property = await Property.findOne({ _id: params.id })
    if (property) {
      const residents = await Resident.find({ property: property._id })
      return response.json({ status: true, residents })
    }
    return response.json({ status: false })
  }

  async store ({ request, response }) {
    let { firstname, lastname, phone, email, properties = [] } = request.all()

    let user = await User.findOne({ $or: [{ email }, { phone }] })
    if (user) {
      return response
        .status(401)
        .json({ status: false, message: 'Email has already been used' })
    }

    user = await User.create({
      firstname,
      lastname,
      phone,
      email,
      name: `${firstname} ${lastname}`,
      password: await Hash.make('password'),
      isResident: true
    })

    const propertyList = []

    if (user) {
      const residentId = user._id.toString()

      for (let property of properties) {
        const newProperty = await Property.create({
          ...property,
          slug: sanitizor.slug(property.name),
          resident: residentId
        })
        propertyList.push(newProperty)
      }

      return response
        .json({
          resident,
          status: true,
          message: 'Resident Created',
          properties: propertyList
        })
    }

    return response
      .status(500)
      .json({ status: false, message: 'Resident Creation Failed' })
  }

  async show ({ params, request, response, view }) {
    const resident = await Resident.findOne({ _id: params.id })
    if (resident) {
      return response.json({ status: true, resident })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const residentData = request.all()

    const resident = await Resident.findOneAndUpdate({ _id: params.id }, residentData, { new: true })
    if (resident) {
      return response.json({ status: true, resident })
    }

    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.resident.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Resident.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = ResidentController
