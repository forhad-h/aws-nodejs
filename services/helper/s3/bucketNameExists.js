const getData = require('../../../sqliteOperations/getData')

module.exports = async (tableName, bucketPrefix) => {
  const rows = await getData(`SELECT * FROM ${tableName}`)

  if (Array.isArray(rows)) {
    const pattern = new RegExp(`^${bucketPrefix}`)
    return rows.some(item => pattern.test(item.bucketName))
  }
}
