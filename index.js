require('dotenv').config()
const AWS = require('aws-sdk')

// global configuration for AWS

// aws services
// require('./services/s3')
require('./services/ses')

console.log('App Running')
