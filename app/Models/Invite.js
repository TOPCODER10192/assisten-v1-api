'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Types
const pointSchema = use('./Point')

/**
 * @class Invite
 */
class Invite extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'AddressHook.method')
    // Indexes:
    this.index({ location: '2dsphere' }, { background: true })
  }
  /**
   * Address's schema
   */
  static get schema () {
    return {
      name:               { type: String, required: true },
      token:              { type: String, required: true }, // email token
      email:              { type: String, default: '' },
      invitedBy:          { type: ObjectId, ref: 'User' },
    }
  }
}

module.exports = Invite.buildModel('Invite')
