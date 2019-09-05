const AWS = require('aws-sdk')

const S3 = new AWS.S3()

module.exports = async bucketName => {
  try {
    await S3.headBucket({ Bucket: bucketName }).promise()
    return true
  } catch (err) {
    //console.error(err, err.stack)
    return false
  }
}
