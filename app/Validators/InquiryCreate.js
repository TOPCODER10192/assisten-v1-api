'use strict'

class InquiryCreate {
  get rules () {
    return {
      firstname:      'required|min:2|max:50',
      lastname:       'required|min:2|max:50',
      email:          'required|email',
      phone:          'required|min:10|max:20',
      message:        'required|max:255',
      schedule:       'required|date',
      time:           'required'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({ status: false, errors })
  }
}

module.exports = InquiryCreate
