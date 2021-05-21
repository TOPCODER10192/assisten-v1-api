'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Types

/**
 * @class Inquiry
 */
class Inquiry extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'InquiryHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Inquiry's schema
   */
  static get schema () {
    return {
      firstname:      { type: String, default: '' },
      lastname:       { type: String, default: '' },
      name:           { type: String, default: '' },
      email:          { type: String, default: '' },
      phone:          { type: String, default: '' },
      message:        { type: String, default: '' },
      schedule:       { type: Date, default: Date.now },
      time:           { type: String, default: '' },
      property:       { type: ObjectId, ref: 'Property' }
    }
  }
}

module.exports = Inquiry.buildModel('Inquiry')
