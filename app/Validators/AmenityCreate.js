'use strict'

class AmenityCreate {
  get rules () {
    return {
      name:       'required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({ status: false, errors })
  }
}

module.exports = AmenityCreate
