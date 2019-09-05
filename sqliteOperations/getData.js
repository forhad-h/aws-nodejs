const db = require('./db')

module.exports = query => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
