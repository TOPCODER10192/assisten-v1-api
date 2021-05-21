'use strict'
const Env = use('Env')
const fetch = use('isomorphic-fetch')

const GOOGLE_API_KEY = Env.get('GOOGLE_API_KEY', 'AIzaSyCxQuTBNM9qGPmTFIjZi04Cf5LWOlF7fbc')


class MapService {
  static async getLatLngByZipCode(zipCode = '') {
    const reply = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}+US&key=${GOOGLE_API_KEY}`)
    const result = await reply.json()
    if (result.status == 'OK') {
      return result.results[0].geometry.location
    }
    return false
  }

}

module.exports = MapService
