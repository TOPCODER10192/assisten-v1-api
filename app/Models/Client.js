'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Schema.Types

/**
 * @class Client
 */
class Client extends BaseModel {
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
      siteUrl:          { type: String, default: '' },

      firstname:        { type: String, default: '' },
      lastname:         { type: String, default: '' },
      name:             { type: String, default: '' },

      email:            { type: String, required: true },
      phone:            { type: String, default: '' },

      password:         { type: String, required: true },
      provider:         { type: String, enum: ['web', 'facebook', 'twitter', 'google'], default: 'web' },
      providerId:       { type: String, default: '' },

      isActive:         { type: Boolean, default: true },

      verificationCode: { type: String, default: '' }, // for email verification
    }
  }
}

module.exports = Client.buildModel('Client')
