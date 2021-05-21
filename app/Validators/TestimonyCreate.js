'use strict'

class TestimonyCreate {
  get rules () {
    return {
      name:             'required',
      message:          'required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({
      errors,
      status: false,
      message: errors.map(e => e.message).join(', ')
    })
  }
}

module.exports = TestimonyCreate
