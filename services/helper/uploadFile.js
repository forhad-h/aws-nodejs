const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')

const rootDir = path.dirname(
  require.main.filename || process.mainModule.filename
)
const img = `${rootDir}/images/img1.png`

const S3 = new AWS.S3(process.env.AWS_API_VERSION)
const keyName = `test-${Date.now()}.png`

module.exports = async bucketName => {
  const paramsSet = {
    ACL: 'public-read',
    Bucket: bucketName,
    Key: keyName,
    Body: fs.readFileSync(img),
    ContentType: 'image/png'
  }
  try {
    await S3.putObject(paramsSet).promise()
    return `https://${bucketName}.s3.amazonaws.com/${keyName}`
  } catch (err) {
    console.error(err, err.stack)
    return false
  }
}
