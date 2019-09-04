const sqlite3 = require('sqlite3').verbose()

module.exports = new sqlite3.Database(`./sqliteDB/aws-nodejs.db`, err => {
  if (err) return console.error(err.message)
})
