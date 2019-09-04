const db = require('./db')

module.exports = tableName => {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName}(${fields})`, err => {
      if (err) reject(err)
      resolve(true)
    })
  })
}
