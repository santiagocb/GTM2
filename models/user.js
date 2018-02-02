
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema
const BCRYPT = require('bcrypt-nodejs') //Libreria para encriptar la contraseña
const CRYPTO = require('crypto') //A partir de el email me crea un avatar

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

userSchema.statics.findOneByEmail = function(email, callback){
    this.findOne({email: new RegExp(email, 'i')}, callback);
};


module.exports = MONGOOSE.model('User', userSchema)
