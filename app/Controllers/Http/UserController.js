'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async index ({ request, response }) {
    const users = await User.find({ }, '-password')
    return response.json({ status: true, users })
  }

  async store ({ request, response }) {
    let data = request.only(['firstname', 'lastname', 'email', 'password'])
    data.password = await Hash.make(data.password)
    const user = await User.create(data)
    return response.json({ status: true, user })
  }

  async show ({ params, request, response, view }) {
    const user = await User.findOne({ _id: params.id })
    if (user) {
      return response.json({ status: true, user })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const user = await User.findOneAndUpdate({ _id: params.id }, request.all(), { new: true })
    if (user) {
      return response.json({ status: true, user })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    // if (!auth.user.isAdmin) {
    //   return response.status(401).json({ status: false })
    // }
    await User.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }

  async passwordReset({ request, response }) {
    const user = await User.findOneAndUpdate({ email: request.input('email') }, { password: await Hash.make('password') }, { new: true })
    return response.json({ status: true, user })
  }

}

module.exports = UserController
