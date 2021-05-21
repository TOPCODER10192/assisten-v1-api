'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class User
 */
class User extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UserHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * User's schema
   */
  static get schema () {
    return {
      firstname:        { type: String, default: '' },
      lastname:         { type: String, default: '' },
      name:             { type: String, default: '' },

      username:         { type: String, default: '' },
      siteUrl:          { type: String, default: '' },

      email:            { type: String, required: true },
      phone:            { type: String, default: '' },
      password:         { type: String, required: true },

      provider:         { type: String, enum: ['web', 'facebook', 'twitter', 'google'], default: 'web' },
      providerId:       { type: String, default: '' },

      verificationCode: { type: String, default: '' }, // for email verification

      isEmployee:       { type: Boolean, default: false },
      isClient:         { type: Boolean, default: false },
      isSuperAdmin:     { type: Boolean, default: false },
    }
  }
}

module.exports = User.buildModel('User')
