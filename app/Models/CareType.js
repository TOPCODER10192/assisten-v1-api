'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Gallery
 */
class CareType extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'GalleryHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Care's schema
   */
  static get schema () {
    return {
      name:     { type: String, required: true },
      slug:     { type: String, default: '' },
    }
  }

  static get timestamps() {
    return false
  }

}

module.exports = CareType.buildModel('CareType')
