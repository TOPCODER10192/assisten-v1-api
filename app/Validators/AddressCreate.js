'use strict'

class AddressCreate {
  get rules () {
    return {
      address:            'required',
      city:               'required',
      stateOrProvince:    'required',
      country:            'required',
      zipOrPostal:        'required',
      latitude:           'required',
      longitude:          'required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({ status: false, errors })
  }
}

module.exports = AddressCreate
