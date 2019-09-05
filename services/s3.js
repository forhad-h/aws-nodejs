const uuid = require('uuid')

const createTable = require('../sqliteOperations/createTable')
const insertData = require('../sqliteOperations/insertData')
const getData = require('../sqliteOperations/getData')
const bucketNameExists = require('./helper/s3/bucketNameExists')
const bucketExists = require('./helper/s3/bucketExists')
const createBucket = require('./helper/s3/createBucket')
const uploadFile = require('./helper/s3/uploadFile')

const tableName = 'aws_s3_data'
const bucketPrefix = 'aws-nodejs'
const bucketName = `${bucketPrefix}-${uuid.v4()}`

AWS.config.update({
  apiVersion: '2006-03-01',
  region: process.env.AWS_S3_REGION
})
;(async () => {
  try {
    // create sqlite table to store data
    fields = 'bucketName text'
    await createTable(tableName, fields)

    // check if bucket name exist in database and bucket exists in AWS
    if (
      !(await bucketNameExists(tableName, bucketPrefix)) &&
      !(await bucketExists(bucketName))
    ) {
      const bucket = await createBucket(bucketName)
      if (bucket.Location) {
        // store bucket name in sqlite
        // replace '/' as bucket.Location returns bucket name followed by '/'
        await insertData(tableName, bucketName)
      }
    }

    // upload image on the bucket
    const getBucketNameRow = await getData(
      `SELECT * FROM ${tableName} WHERE bucketName LIKE 'aws-nodejs%'`
    )
    const targetedBucketName = getBucketNameRow[0].bucketName

    const uploadedFileUrl = await uploadFile(targetedBucketName)

    // print uploaded file url
    uploadedFileUrl && console.log('Uploaded image url: ', uploadedFileUrl)
  } catch (err) {
    return console.error(err)
  }
})()
