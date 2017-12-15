
const MONGOOSE = require('mongoose')
const APP = require('./app')
const CONFIG = require('./config')
// "npm start" para iniciar el server

MONGOOSE.connect(CONFIG.db, (err, res) => {
	if(err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida.')
	APP.listen(CONFIG.port, () => {
	console.log(`API Rest corriendo en http://localhost:${CONFIG.port}`);
	})
})
