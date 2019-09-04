const AWS = require('aws-sdk')
const uuid = require('uuid')

const createTable = require('../sqliteOperations/createTable')
const insertData = require('../sqliteOperations/insertData')
const bucketNameExists = require('./helper/bucketNameExists')
const bucketExists = require('./helper/bucketExists')
const createBucket = require('./helper/createBucket')

const tableName = 'aws_s3_data'
const bucketPrefix = 'aws-nodejs'
const bucketName = `${bucketPrefix}-${uuid.v4()}`
const keyName = 'hello_world.txt'

;(async () => {
  try {
    // create sqlite table to store data
    fields = 'bucketName text'
    await createTable(tableName, fields)

    // check if bucket name exist in database and bucket exists in AWS
    if (
      !(await bucketNameExists(bucketPrefix)) &&
      !(await bucketExists(bucketName))
    ) {
      const bucket = await createBucket(bucketName)
      if (bucket.Location) {
        // store bucket name in sqlite database
        await insertData(tableName, bucket.Location.replace(/^\//, ''))
      }
    }
  } catch (err) {
    return console.error(err)
  }
})()

/* const bucketPromise = new AWS.S3({ apiVersion })
  .createBucket({ Bucket: bucketName })
  .promise()

bucketPromise
  .then(data => {
    const objectParams = {
      Bucket: bucketName,
      Key: keyName,
      Body: 'Hello World!'
    }
    const uploadPromise = new AWS.S3(apiVersion).putObject(objectParams).promise()
    uploadPromise.then(data => {
      console.log(`Successfully uploaded to ${bucketName}/${keyName}`)
    }).catch(err => console.log(err))
  })
  .catch(err => console.error(err, error.stack)) */

console.log('Project Running')
