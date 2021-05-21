'use strict'

const Inquiry = use('App/Models/Inquiry')
const Property = use('App/Models/Property')

/**
 * Resourceful controller for interacting with inquiries
 */
class InquiryController {

  async index ({ request, response }) {
    const inquiries = await Inquiry.find({ })
    return response.json({ status: true, inquiries })
  }

  async store ({ request, response }) {
    const data = request.only(['name'])
    const inquiry = await Inquiry.create(data)
    return response.json({ status: true, inquiry })
  }

  async show ({ params, request, response, view }) {
    const inquiry = await Inquiry.findOne({ _id: params.id })
    if (inquiry) {
      return response.json({ status: true, inquiry })
    }
    return response.status(404).json({ status: false })
  }

  async update ({ params, request, response }) {
    const inquiry = await Inquiry.findOneAndUpdate({ _id: params.id }, request.all(), { new: true })
    if (inquiry) {
      return response.json({ status: true, inquiry })
    }
    return response.status(404).json({ status: false })
  }

  async destroy ({ auth, params, request, response }) {
    if (!auth.isAdmin) {
      return response.status(401).json({ status: false })
    }
    await Inquiry.findOneAndDelete({ _id: params.id })
    return response.json({ status: true })
  }

  // POST property/:id/inquiry
  async createForProperty({ params, request, response }) {
    const inquiryData = request.all()

    const property = await Property.findOne({ _id: params.id })
    if (property) {
      const inquiry = await Inquiry.create({
        ...inquiryData,
        name: `${inquiryData.firstname} ${inquiryData.lastname}`,
        property: params.id
      })
      return response.json({ status: true, inquiry })
    }

    return response
      .status(404)
      .json({ status: false, message: 'Property Not Found' })
  }

  async getForProperty({ params, request, response }) {
    const property = await Property.findOne({ _id: params.id })

    if (property) {
      const inquiries = await Inquiry.find({ property: property._id })
      return response.json({ status: true, inquiries })
    }

    return response
      .status(404)
      .json({ status: false, message: 'Property Not Found' })
  }

}

module.exports = InquiryController
