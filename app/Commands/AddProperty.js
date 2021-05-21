'use strict'

const { Command } = require('@adonisjs/ace')
const PropertyFaker = use('App/Service/PropertyFaker')

class AddProperty extends Command {
  static get signature () {
    return 'add:properties'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    let count = await this.ask('How many to properties to generate?', 1)
    await PropertyFaker.generate(parseInt(count || 1))
    process.exit(1)
  }
  
}

module.exports = AddProperty
