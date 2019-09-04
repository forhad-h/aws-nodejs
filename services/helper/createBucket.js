const AWS = require('aws-sdk')

const S3 = new AWS.S3(process.env.AWS_API_VERSION)

module.exports = async bucketName => {
  try {
    const result = await S3.createBucket({ Bucket: bucketName }).promise()
    return result
  } catch (err) {
    console.log(err, err.stack)
  }
}
