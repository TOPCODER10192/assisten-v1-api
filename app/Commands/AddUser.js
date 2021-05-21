'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')
const Hash = use('Hash')
const process = use('process')

class AddUser extends Command {
  static get signature () {
    return 'add:user'
  }

  static get description () {
    return 'Add User'
  }

  async handle (args, options) {
    const firstname = await this.ask('First Name: ')
    const lastname = await this.ask('Last Name: ')
    const email = await this.ask('Email: ')
    const password = await this.ask('Password: ')

    const user = await User.create({
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      email,
      password: await Hash.make(password)
    })

    process.exit(1)
    this.info('User Created')
  }
}

module.exports = AddUser
