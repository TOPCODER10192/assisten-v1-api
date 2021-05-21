'use strict'

class PropertyCreate {
  get rules () {
    return {
      name:             'required|min:2',
      phone:            'required|max:12',
      email:            'required|email',
      cost:             'required|above:0|number',

      heading:          'required',
      // description:      'required',

      location:         'required',
      latitude:         'required',
      longitude:        'required',

      'testimonies.*.name':       'required',
      'testimonies.*.message':  'required',

    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.json({ status: false, errors, message: errors.map(e => e.message).join(', ') })
  }
}

module.exports = PropertyCreate
