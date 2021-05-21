const pointSchema = {
  type: {
    type: String,
    enum: ['Point']
  },
  coordinates: {
    type: [Number],
  }
}

module.exports = pointSchema
