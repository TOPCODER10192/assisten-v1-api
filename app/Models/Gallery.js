'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Gallery
 */
class Gallery extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'GalleryHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Gallery's schema
   */
  static get schema () {
    return {
      name:     { type: String, default: '' },
      url:      { type: String, default: '' },
      width:    { type: Number, default: 0 },
      height:   { type: Number, default: 0 },
    }
  }
}

module.exports = Gallery.buildModel('Gallery')
