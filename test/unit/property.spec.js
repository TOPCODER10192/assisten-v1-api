'use strict'

const { test, trait } = use('Test/Suite')('Property')
const Property = use('App/Models/Property')
const User = use('App/Models/User')
const { sanitizor } = use('Validator')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of properties', async ({ client }) => {
  const response = await client.get('/v1/properties').end()
  response.assertJSONSubset({
    status: true,
    properties: []
  })
  response.assertStatus(200)
})

test('create property', async ({ client, assert }) => {

  const response = await client
    .post('/v1/account/properties')
    .header('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmI3ZDViZjgwMWI0YzM3YjJiOTg1NmQiLCJpYXQiOjE2MDYxMDMxMTl9.24gG7kAK6bGxJWtBfqH17EOFgyHwmf292KX8xW8Dkp4')
    .send({
      name: 'Senior Care Service',
      heading: 'Elderly Care Facility',
      email: 'support@seniorcare.com',
      phone: '+17189512200',
      location: '2636 Nostrand Ave., Brooklyn, NY 11210, United States',
      cost: 300,
      latitude: '40.6187977',
      longitude: '-73.9514591'
    })
    .end()

  response.assertJSONSubset({
    status: true,
    property: {},
  })
  response.assertStatus(200)

  const { property } = response.body

  await Property.findOneAndDelete({ _id: property._id })

  // response.assertStatus(200)
})

test('create property with testimonials', async ({ client, assert }) => {

  const response = await client
    .post('/v1/account/properties')
    .header('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmI3ZDViZjgwMWI0YzM3YjJiOTg1NmQiLCJpYXQiOjE2MDYxMDMxMTl9.24gG7kAK6bGxJWtBfqH17EOFgyHwmf292KX8xW8Dkp4')
    .send({
      name: 'Senior Care Service',
      heading: 'Elderly Care Facility',
      email: 'support@seniorcare.com',
      phone: '+17189512200',
      location: '2636 Nostrand Ave., Brooklyn, NY 11210, United States',
      cost: 300,
      latitude: '40.6187977',
      longitude: '-73.9514591',
      testimonials: [
        { name: 'John Doe', message: 'Nice place for my grandparents to quarantine from COVID' },
        { name: 'Roberty Downey', message: 'They have assisted my grandfather' }
      ]
    })
    .end()

  response.assertJSONSubset({
    status: true,
    property: {
      testimonials: []
    },
  })
  response.assertStatus(200)

  const { property } = response.body

  await Property.findOneAndDelete({ _id: property._id })

  // response.assertStatus(200)
})
