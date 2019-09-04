const db = require('./db')

module.exports = (tableName, values) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO ${tableName} VALUES(?)`, values, function (err) {
      if (err) reject(err)
      resolve(this.lastID)
    })
  })
}
