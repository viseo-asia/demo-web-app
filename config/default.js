const nconf = require('nconf')

module.exports = nconf

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. Docker EE created secret files
//
nconf
    .argv()
    .env()
    // load docker ee secrets files (if they exist)
    .file('dbusername', '/run/secrets/dbusername.json')
    .file('dbpassword', '/run/secrets/dbpassword.json')

nconf.defaults({
    app: {
        name: 'Demo Web App',
        version: '1.0.0'
    },
    database: {
        dbusername: process.env.DB_USERNAME || 'default-dbusername',
        dbpassword: process.env.DB_PASSWORD || 'default-dbpassword',
    }
})
