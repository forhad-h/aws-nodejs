const AWS = require('aws-sdk')

AWS.config.update({
  apiVersion: '2010-12-01',
  region: 'us-west-2'
})

const SES = new AWS.SES()

const params = {
  Destination: {
    ToAddresses: ['websitedeveloper39@gmail.com']
  },
  Message: {
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test Subject'
    },
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: '<h1 style="color: #0f0">Email sending successful.</h1>'
      }
    }
  },
  Source: 'forhad19s@gmail.com'
}
;(async () => {
  // get status
  console.log(await SES.sendEmail(params).promise())
})()
