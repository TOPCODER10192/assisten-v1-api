'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Types
const pointSchema = use('./Point')

/**
 * @class Address
 */
class Address extends BaseModel {
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
      address:          { type: String, required: true },
      city:             { type: String, default: '' },
      stateOrProvince:  { type: String, default: '' },
      country:          { type: String, default: '' },
      zipOrPostal:      { type: String, default: '' },
      point:            { type: pointSchema },
      addedBy:          { type: ObjectId, ref: 'User' },
      addedByAdmin:     { type: Boolean, default: false }
    }
  }
}

module.exports = Address.buildModel('Address')
