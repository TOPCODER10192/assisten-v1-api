'use strict'

class TimesheetCreate {
  get rules () {
    return {
      name:            'required',
      permissions:     'required',
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

module.exports = TimesheetCreate
