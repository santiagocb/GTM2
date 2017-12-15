//configuración del EXPRESS

const EXPRESS = require('express')
const BODYPARSER = require('body-parser')
const APP = EXPRESS();
const CORS = require('cors');
const GTM = require('./routes')
const MORGAN = require('morgan')

APP.use(CORS())
APP.use(MORGAN('dev'))
APP.use('/public', EXPRESS.static(__dirname + '/public'));
APP.use('/node_modules', EXPRESS.static(__dirname + '/node_modules'));
APP.get('/',function (req,res) {
   return res.sendfile('./public/index.html') //Página de inicio por defecto.
})

APP.use(BODYPARSER.urlencoded({ extended: false}))
APP.use(BODYPARSER.json())

APP.use('/gtm', GTM)

module.exports = APP
