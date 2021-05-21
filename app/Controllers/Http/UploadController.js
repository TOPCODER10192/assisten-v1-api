'use strict'
const Drive = use('Drive')

class UploadController {

  async _uploadToS3(name, upload) {
    const photoBuff = Buffer.from(upload, 'base64')
    return await Drive.disk('s3').put(name, photoBuff, { 'ACL': 'public-read', ContentType: 'image/jpeg' })
  }

  async uploadAvatar({ request, response }) {
    const { name, upload } = request.all()
    const photo = await this._uploadToS3(`avatar/${name}`, upload)
    return response.json({ status: true, name, photo })
  }

  async uploadPropertyPhoto({ request, response }) {
    const { name, upload } = request.all()
    const photo = await this._uploadToS3(`property/${name}`, upload)
    return response.json({ status: true, name, photo })
  }
}

module.exports = UploadController
