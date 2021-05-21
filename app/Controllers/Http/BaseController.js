'use strict'

class BaseController {
  async _createPagination({ model, page = 0, limit = 50, where = {}, search = '', searchFields = [] }) {
    const searchExp = new RegExp(search, 'ig')
    const searchQuery = searchFields.map(sf => ({ [sf]: searchExp }))
    const modelWhere = { ...where, $or: searchQuery }
    const total = await model.count(modelWhere)
    const skip = parseInt(page) * parseInt(limit)
    const pages = Math.round(parseInt(total) / parseInt(limit))
    return { page, pages, skip, limit, total, where: modelWhere }
  }

  _createSearchQuery(search, fields = []) {
    const searchExp = new RegExp(search, 'ig')
    return (fields || []).map(sf => ({ [sf]: searchExp }))
  }

}

module.exports = BaseController
