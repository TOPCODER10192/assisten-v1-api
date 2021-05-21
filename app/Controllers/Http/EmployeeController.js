'use strict'

const Employee = use('App/Models/Employee')
const User = use('App/Models/User')
const Property = use('App/Models/Property')
const Hash = use('Hash')
const { sanitizor } = use('Validator')

/**
 * Resourceful controller for interacting with employees
 */
class EmployeeController {

  async index ({ request, response }) {
    const employees = await Employee.find({}).populate('user')
    return response.json({ status: true, employees })
  }

  async store ({ request, response }) {
    let { firstname, lastname, phone, email, wageRate, payType, role } = request.all()

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
      isEmployee: true
    })

    if (user) {
      const employee = await Employee.create({
        user: user._id.toString(),
        roles: [role],
        wageRate,
        payType,
      })
      return response
        .json({
          user,
          employee,
          status: true,
          message: 'Employee Creation Failed'
        })
    }

    return response
      .status(500)
      .json({ status: false, message: 'Employee Creation Failed' })
  }

  async show ({ params, request, response, view }) {
    const employee = await Employee.findOne({ _id: params.id }).populate('user', '-password')
    if (employee) {
      return response.json({ status: true, employee })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const employeeData = request.all()

    const employee = await Employee.findOneAndUpdate({ _id: params.id }, employeeData, { new: true })
    if (employee) {
      return response.json({ status: true, employee })
    }

    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.user.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Employee.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }
}

module.exports = EmployeeController
