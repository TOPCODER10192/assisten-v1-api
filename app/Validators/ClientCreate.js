'use strict'

class ClientCreate {
  get rules () {
    return {
      firstname:            'required',
      lastname:             'required',
      email:                'required',
      phone:                'required',
      website:              'required',
      properties:           'array',
      'properties.*.name':  'required',
      'properties.*.email': 'required',
      'properties.*.phone': 'required'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({
      errors,
      status: false,
      message: errors.map(e => e.message)
    })
  }
}

module.exports = ClientCreate
