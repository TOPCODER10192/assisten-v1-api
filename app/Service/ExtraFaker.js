'use strict'

const Amenity = use('App/Models/Amenity')
const CareType = use('App/Models/CareType')
const RoomType = use('App/Models/RoomType')
const faker = use('faker')
const process = use('process')
const { sanitizor } = use('Validator')

class ExtraFaker {

  static async generate() {
    await Amenity.deleteMany({ name: { $exists: true } })
    await CareType.deleteMany({ name: { $exists: true } })
    await RoomType.deleteMany({ name: { $exists: true } })

    await Amenity.insertMany([
      { name: 'Wifi', slug: 'wifi' },
      { name: 'Cable TV', slug: 'cabletv' },
      { name: 'Laundry', slug: 'laundry' },
      { name: 'Air Conditioning', slug: 'aircon' },
      { name: 'Heating', slug: 'heating' },
      { name: 'Restaurant', slug: 'restaurant' },
      { name: 'Fitness Center', slug: 'fitness-center' },
      { name: 'Swimming Pool/Hot Tub', slug: 'pool' },
      { name: 'Library/Computer Room', slug: 'library' },
      { name: 'Beauty Salon', slug: 'salon' },
    ])

    await CareType.insertMany([
      { name: 'Independent Living', slug: 'independent' },
      { name: 'Assisted', slug: 'assisted' },
      { name: 'In-Home Care', slug: 'inhome' },
      { name: 'Memory', slug: 'memory' },
      { name: 'Behavioral', slug: 'behavioral' }
    ])

    await RoomType.insertMany([
      { name: 'Studio', slug: 'studio' },
      { name: 'Private', slug: 'private' },
      { name: 'Shared', slug: 'shared' },
    ])

    return true
  }

}

module.exports = ExtraFaker
