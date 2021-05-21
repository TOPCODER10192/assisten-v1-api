'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Schema.Types

/**
 * @class Resident
 */
class Resident extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UserHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Client's schema
   */
  static get schema () {
    return {
      user:             { type: ObjectId, ref: 'User' },
      property:         { type: ObjectId, ref: 'Property' },

      firstname:        { type: String, default: '' },
      lastname:         { type: String, default: '' },
      name:             { type: String, default: '' },

      email:            { type: String, required: true },
      phone:            { type: String, default: '' },

      password:         { type: String, required: true },
      isActive:         { type: Boolean, default: true },

      verificationCode: { type: String, default: '' }, // for email verification
    }
  }
}

module.exports = Resident.buildModel('Resident')
