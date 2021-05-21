'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Schema.Types
const pointSchema = use('./Point')

const testimonySchema = {
  name:       { type: String, default: '' },
  message:    { type: String, default: '' },
  isFeat:     { type: Boolean, default: false },
  photo:      { type: String, default: '' }
}

/**
 * @class Property
 */
class Property extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'BusinessHook.method')
    // Indexes:
    this.index({ point: '2dsphere' }, { background: true })
  }
  /**
   * Business's schema
   */
  static get schema () {
    return {
      name:             { type: String, required: true, unique: true },
      slug:             { type: String, unique: true, default: '' },
      heading:          { type: String, default: '' },
      phone:            { type: String, default: '' },
      email:            { type: String, default: '' },
      description:      { type: String, default: '' },
      atHomeCare:       { type: Boolean, default: false },
      primaryPhoto:     { type: String, default: '' },
      cost:             { type: Number, default: 0 },
      recur:            { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'monthly' },
      featPhoto:        { type: String, default: '' },
      photos:           [{ type: String }],
      typesOfCare:      [{ type: String }], //independent, assisted, in-home
      roomTypes:        [{ type: String }],
      amenities:        [{ type: String }],
      tags:             [{ type: String }], // bathing, grooming, dimensia, walker, wheelchair, etc
      location:         { type: String, default: '' },
      addedBy:          { type: ObjectId, ref: 'User' },
      users:            [{ type: ObjectId, ref: 'User' }],
      residents:        [{ type: ObjectId, ref: 'Resident' }],
      views:            { type: Number, default: 0 }, // property page visit
      stays:            { type: Number, default: 0 }, // property stays count
      point:            pointSchema,
      testimonials:     [testimonySchema],
    }
  }
}

module.exports = Property.buildModel('Property')
