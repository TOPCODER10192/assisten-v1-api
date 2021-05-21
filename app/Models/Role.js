'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Role
 */
class Role extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'AmenityHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Role's schema
   */
  static get schema () {
    return {
      name:         { type: String, required: true },
      permissions:  [{ type: String }]
    }
  }
}

module.exports = Role.buildModel('Role')
