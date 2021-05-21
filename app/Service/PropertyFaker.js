'use strict'

const Property = use('App/Models/Property')
const Amenity = use('App/Models/Amenity')
const CareType = use('App/Models/CareType')
const RoomType = use('App/Models/RoomType')
const { sanitizor } = use('Validator')

const faker = use('faker')
const process = use('process')
const shuffle = use('lodash/shuffle')

const addresses = require('./addresses.json').addresses

const randomDex = (list) => Math.floor(Math.random() * list.length)

class PropertyFaker {

  // async geocode(address) {
  //   const reply = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=AIzaSyCxQuTBNM9qGPmTFIjZi04Cf5LWOlF7fbc`)
  //   const result = await reply.json()
  //   if (result.status == 'OK') {
  //     const addr = result.results[0]
  //     return {
  //       address: addr.formatted_address,
  //       latitude: addr.geometry.location.lat,
  //       longitude: addr.geometry.location.lng
  //     }
  //   }
  // }

  static async generate(count = 0) {
    await Property.deleteMany({ name: { $exists: true } })
    const amenities = await Amenity.find({})
    const careTypes = await CareType.find({})
    const roomTypes = await RoomType.find({})
    const tagList = ['dementia', 'emergency', 'walker', 'wheelchair', 'cane', 'dressing', 'bathing', 'grooming', 'medication', 'incontinence']

    let properties = []
    for (let i = 1; i <= count; i++) {

      const addr = addresses[randomDex(addresses)]

      const rooms = shuffle(roomTypes).slice(0, 2).map(d => d.slug)
      const amens = shuffle(amenities).slice(0, 4).map(d => d.slug)
      const cares = shuffle(careTypes).slice(0, 2).map(d => d.slug)
      const tagss = shuffle(tagList).slice(0, 4)

      const location = `${addr.address1} ${addr.city} ${addr.state} ${addr.postalCode}`

      // const geoAddr = await this.geocode(location)
      // console.log("GEO ADDR", geoAddr)

      let property = {
        name: faker.company.companyName(),
        heading: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
        location,
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        featPhoto: faker.image.unsplash.buildings(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email().toLowerCase(),
        cost: parseFloat(faker.commerce.price()),
        recur: 'monthly',
        photos: [
          faker.image.unsplash.buildings(),
          faker.image.unsplash.buildings(),
          faker.image.unsplash.buildings()
        ],
        roomTypes: rooms,
        typesOfCare: cares,
        amenities: amens,
        tags: tagss,
      }

      property.slug = sanitizor.slug(property.name)
      property.point = {
        type: 'Point',
        coordinates: [
          addr.coordinates.lng,
          addr.coordinates.lat
        ]
      }

      properties.push(property)
    }

    await Property.insertMany(properties)
    return properties
  }

}

module.exports = PropertyFaker
