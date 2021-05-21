'use strict'

const Client = use('App/Models/Client')
const User = use('App/Models/User')
const Property = use('App/Models/Property')
const Hash = use('Hash')
const { sanitizor } = use('Validator')

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {

  async index ({ request, response }) {
    const clients = await Client.find({ }).populate('user', '-password')
    return response.json({ status: true, clients })
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
      isClient: true
    })

    const propertyList = []

    if (user) {
      const clientId = user._id.toString()

      for (let property of properties) {
        const newProperty = await Property.create({
          ...property,
          slug: sanitizor.slug(property.name),
          client: clientId
        })
        propertyList.push(newProperty)
      }

      return response
        .json({
          client,
          status: true,
          message: 'Client Created',
          properties: propertyList
        })
    }

    return response
      .status(500)
      .json({ status: false, message: 'Client Creation Failed' })
  }

  async show ({ params, request, response, view }) {
    const client = await Client.findOne({ _id: params.id })
    if (client) {
      return response.json({ status: true, client })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const clientData = request.all()

    const client = await Client.findOneAndUpdate({ _id: params.id }, clientData, { new: true })
    if (client) {
      return response.json({ status: true, client })
    }

    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.client.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Client.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = ClientController
