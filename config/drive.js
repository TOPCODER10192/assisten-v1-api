'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

// "AWS_CONFIG": {
//     "accessKeyId": "AWS_ACCESS_KEY",
//     "secretAccessKey": "AWS_SECRET_KEY",
//     "region": "AWS_REGION"
// }
// const bucketName = config.get('BUCKET_NAME')
// const region = config.get('BUCKET_REGION')
// const bucketUrl = `https://${bucketName}.s3.${region}.amazonaws.com`

const AWS_ACCESS_KEY = Env.get('AWS_ACCESS_KEY', false)
const AWS_SECRET_KEY = Env.get('AWS_SECRET_KEY', false)
const AWS_REGION = Env.get('AWS_REGION', false)
const AWS_BUCKET_NAME = Env.get('BUCKET_NAME', false)
const AWS_BUCKET_REGION = Env.get('BUCKET_REGION', false)
const AWS_CRED_URI = Env.get('AWS_CONTAINER_CREDENTIALS_RELATIVE_URI', false)

// if (!AWS_CRED_URI) {
//   AWS_CONFIG = Env.get('AWS_CONFIG')
// }
//
// if (process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI == null) {
//   AWS.config.update(config.get('AWS_CONFIG'))
// }

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk is used when you interact with the file system without
  | defining a disk name
  |
  */
  default: 'local',

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Local disk interacts with the a local folder inside your application
    |
    */
    local: {
      root: Helpers.tmpPath(),
      driver: 'local'
    },

    /*
    |--------------------------------------------------------------------------
    | S3
    |--------------------------------------------------------------------------
    |
    | S3 disk interacts with a bucket on aws s3
    |
    */
    s3: {
      driver: 's3',
      key: AWS_ACCESS_KEY ? AWS_ACCESS_KEY : Env.get('S3_KEY'),
      secret: AWS_SECRET_KEY ? AWS_SECRET_KEY : Env.get('S3_SECRET'),
      bucket: AWS_BUCKET_NAME ? AWS_BUCKET_NAME : Env.get('S3_BUCKET'),
      region: AWS_BUCKET_REGION ? AWS_BUCKET_REGION : Env.get('S3_REGION')
    }
  }
}
