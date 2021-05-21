'use strict'

const { test, trait } = use('Test/Suite')('Inquiry')
const Property = use('App/Models/Property')
const Inquiry = use('App/Models/Inquiry')
const User = use('App/Models/User')
const { sanitizor } = use('Validator')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of inquiries by property', async ({ client }) => {

  const property = await Property.findOne({ name: { $exists: true } })

  const response = await client.get(`/v1/property/${property._id}/inquiries`).end()
  response.assertJSONSubset({
    status: true,
    inquiries: []
  })
  response.assertStatus(200)
})

test('create inquiry', async ({ client, assert }) => {

  const property = await Property.findOne({ name: { $exists: true } })

  const response = await client
    .post(`/v1/property/${property._id}/inquiry`)
    .send({
      firstname: 'Mark',
      lastname: 'Davis',
      phone: '+17189512200',
      email: 'mark@davis.com',
      message: 'This is just an inquiry',
      schedule: '2020-11-29'
    })
    .end()

  response.assertJSONSubset({
    status: true,
    inquiry: {},
  })
  response.assertStatus(200)

  const { inquiry } = response.body

  await Inquiry.findOneAndDelete({ _id: inquiry._id })
})
