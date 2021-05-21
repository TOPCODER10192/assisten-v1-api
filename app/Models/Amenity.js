'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Amenity
 */
class Amenity extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'AmenityHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Amenity's schema
   */
  static get schema () {
    return {
      name:       { type: String, required: true },
      slug:       { type: String, default: '' },
      icon:       { type: String, default: '' }
    }
  }

  static get timestamps() {
    return false
  }
}

module.exports = Amenity.buildModel('Amenity')
