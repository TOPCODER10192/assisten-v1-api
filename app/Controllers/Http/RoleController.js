'use strict'

const Role = use('App/Models/Role')
const Hash = use('Hash')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {

  async index ({ request, response }) {
    const roles = await Role.find({ })
    return response.json({ status: true, roles })
  }

  async store ({ request, response }) {
    const roleData = request.all()
    const role = await Role.create(data)
    return response.json({ status: true, role })
  }

  async show ({ params, request, response, view }) {
    const role = await Role.findOne({ _id: params.id })
    if (role) {
      return response.json({ status: true, role })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const roleData = request.all()
    const role = await Role.findOneAndUpdate({ _id: params.id }, roleData, { new: true })
    if (role) {
      return response.json({ status: true, role })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.user.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Role.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = RoleController
