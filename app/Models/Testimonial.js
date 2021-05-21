'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Testimonial
 */
class Testimonial extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'TestimonialHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Testimonial's schema
   */
  static get schema () {
    return {
      name:       { type: String, default: '' },
      message:    { type: String, default: '' },
      isFeat:     { type: Boolean, default: false },
      photo:      { type: String, default: '' }
    }
  }
}

module.exports = Testimonial.buildModel('Testimonial')
