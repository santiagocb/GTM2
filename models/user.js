
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema
const BCRYPT = require('bcrypt-nodejs') //Libreria para encriptar la contraseña
const CRYPTO = require('crypto') //A partir de el email me crea un avatar

var url = "mongodb://system:gtmroot@ds245518.mlab.com:45518/gtmdb"

var moon = MONGOOSE.connect(url)

function close() {
  moon.close()
}

var userSchema = new SCHEMA({
	email: {type: String, unique: true, lowercase: true},
	name: {type: String},
	address: {type: String, default: ''},
	phone: {type: String, default: ''},
	country: {type: String, default: ''},
	gender: {type: String, enum: ['Male','Female','Undefined']},
	user: {type: String, unique: true, lowercase: true},
	password: {type: String},
	registerDate: {type: Date, default: Date.now()},
	image: {data: Buffer, contentType: String},
	lastLogin: Date			//Aún no implementado
})

userSchema.pre('save', function(next){ //Algoritmo para codificar la contraseña antes de ser guardada
	let user = this
	if (!user.isModified('password')) return next()

	BCRYPT.genSalt(10, (err, salt) => {
		if (err) return next(err)
		BCRYPT.hash(user.password, salt, null, (err, hash) => { //Método de creació de hash
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

userSchema.statics.findOneByEmailOrUser = function(email, user, callback) {
	this.find({$or:[{email: email}, {user: user}]}, callback)
}


module.exports = MONGOOSE.model('User', userSchema)
