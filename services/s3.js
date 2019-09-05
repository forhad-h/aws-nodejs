const uuid = require('uuid')

const createTable = require('../sqliteOperations/createTable')
const insertData = require('../sqliteOperations/insertData')
const getData = require('../sqliteOperations/getData')
const bucketNameExists = require('./helper/bucketNameExists')
const bucketExists = require('./helper/bucketExists')
const createBucket = require('./helper/createBucket')
const uploadFile = require('./helper/uploadFile')

const tableName = 'aws_s3_data'
const bucketPrefix = 'aws-nodejs'
const bucketName = `${bucketPrefix}-${uuid.v4()}`

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
        await insertData(tableName, bucket.Location.replace(/^\//, ''))
      }
    }

    // upload image on the bucket
    const getBucketNameRow = await getData(
      `SELECT * from ${tableName} WHERE bucketName LIKE '${bucketPrefix}%'`
    )
    const targetedBucketName = getBucketNameRow[0].bucketName

    const uploadedFileUrl = await uploadFile(targetedBucketName)

    // print uploaded file url
    uploadedFileUrl && console.log('Uploaded image url: ', uploadedFileUrl)
  } catch (err) {
    return console.error(err)
  }
})()

