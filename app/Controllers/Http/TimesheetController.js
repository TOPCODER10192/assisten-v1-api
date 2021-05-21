'use strict'

const Timesheet = use('App/Models/Timesheet')
const Hash = use('Hash')

/**
 * Resourceful controller for interacting with timesheets
 */
class TimesheetController {

  async index ({ request, response }) {
    const timesheets = await Timesheet.find({ })
    return response.json({ status: true, timesheets })
  }

  async store ({ request, response }) {
    const timeData = request.all()
    const timesheet = await Timesheet.create(data)
    return response.json({ status: true, timesheet })
  }

  async show ({ params, request, response, view }) {
    const timesheet = await Timesheet.findOne({ _id: params.id })

    if (timesheet) {
      return response.json({ status: true, timesheet })
    }

    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const timeData = request.all()

    const timesheet = await Timesheet.findOneAndUpdate({ _id: params.id }, timeData, { new: true })

    if (timesheet) {
      return response.json({ status: true, timesheet })
    }

    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.user.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Timesheet.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = TimesheetController
