const db = require('./db')

module.exports = tableName => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
