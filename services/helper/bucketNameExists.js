const getAllData = require('../../sqliteOperations/getAllData')

module.exports = async bucketPrefix => {
  const rows = await getAllData('aws_s3_data')

  if (Array.isArray(rows)) {
    const pattern = new RegExp(`^${bucketPrefix}`)
    return rows.some(item => pattern.test(item.bucketName))
  }
}
