'use strict'

const Ticket = use('App/Models/Ticket')

/**
 * Resourceful controller for interacting with inquiries
 */
class TicketController {

  async index ({ request, response }) {
    const inquiries = await Ticket.find({ })
    return response.json({ status: true, inquiries })
  }

  async store ({ request, response }) {
    const data = request.only(['name'])
    const ticket = await Ticket.create(data)
    return response.json({ status: true, ticket })
  }

  async show ({ params, request, response, view }) {
    const ticket = await Ticket.findOne({ _id: params.id })
    if (ticket) {
      return response.json({ status: true, ticket })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const ticket = await Ticket.findOneAndUpdate({ _id: params.id }, request.all(), { new: true })
    if (ticket) {
      return response.json({ status: true, ticket })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Ticket.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = TicketController
