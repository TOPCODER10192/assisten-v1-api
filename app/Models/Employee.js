'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Schema.Types

/**
 * @class Employee
 */
class Employee extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UserHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Employee's schema
   */
  static get schema () {
    return {
      user:             { type: ObjectId, ref: 'User' },
      roles:            [{ type: ObjectId, ref: 'Role' }],
      wageRate:         { type: Number, default: 0 },
      payType:          { type: String, enum: ['hourly', 'weekly', 'monthly'], default: 'hourly' },
      timezone:         { type: String },
      schedules:        { type: Mixed },
                        // DAY_NUMBER: { start: Timestamp, end: Timestamp, hours: Number }
                        // DAY_NUMBER = 0 - Sunday, 6 - Saturday
    }
  }
}

module.exports = Employee.buildModel('Employee')
