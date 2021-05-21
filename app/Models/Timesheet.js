'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Types

/**
 * @class Timesheet
 */
class Timesheet extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'AmenityHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Timesheet's schema
   */
  static get schema () {
    return {
      employee:     { type: ObjectId, ref: 'Employee' },
      hoursWorked:  { type: Number, default: 0 },
      hoursSched:   { type: Number, default: 0 },
      sched:        { start: String, end: String },
      estWage:      { type: Number, default: 0 },
      history:      [{
                      in: Number, // timestamp clock in
                      out: Number, // timestamp clock out
                      hours: Number // total hours
                    }]
    }
  }
}

module.exports = Timesheet.buildModel('Timesheet')
