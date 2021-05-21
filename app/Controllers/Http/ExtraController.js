'use strict'

const Amenity = use('App/Models/Amenity')
const CareType = use('App/Models/CareType')
const RoomType = use('App/Models/RoomType')

const Property = use('App/Models/Property')
const User = use('App/Models/User')
const Inquiry = use('App/Models/Inquiry')

const dayjs = use('dayjs')

class ExtraController {

  async index({ request, response }) {
    const amenities = await Amenity.find({})
    const careTypes = await CareType.find({})
    const roomTypes = await RoomType.find({})
    return response.json({
      status: true,
      amenities,
      careTypes,
      roomTypes,
    })
  }

  async stats({ request, response }) {
    return response.json({
      avgRevenue: 1278,
      revenues: {
        [dayjs().format('YYYY-MM-DD')]: 1430.96,
        [dayjs().subtract(1, 'day').format('YYYY-MM-DD')]: 1130.13
      },
      properties: await Property.count(),
      inquiries: await Inquiry.count(),
      users: await User.count()
    })
  }

}

module.exports = ExtraController
