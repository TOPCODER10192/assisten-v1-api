'use strict'

const { Command } = require('@adonisjs/ace')
const ExtraFaker = use('App/Service/ExtraFaker')

class AddAmenity extends Command {
  static get signature () {
    return 'add:extras'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {

    await ExtraFaker.generate()

    process.exit(1)
  }
}

module.exports = AddAmenity
