'use strict'

class UserCreate {
  get rules () {
    return {
      firstname:      'required',
      lastname:       'required',
      email:          'required',
      password:       'required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({ status: false, errors, message: errors.map(e => e.message) })
  }
}

module.exports = UserCreate
