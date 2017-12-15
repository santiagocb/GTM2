
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema
const BCRYPT = require('bcrypt-nodejs') //Libreria para encriptar la contraseña
const CRYPTO = require('crypto') //A partir de el email me crea un avatar

var userSchema = new SCHEMA({
	email: {type: String, unique: true, lowercase: true},
	name: {type: String},
	avatar: {type: String}, //Se guarda la URL donde es guardada la imagen
	address: {type: String, default: ''},
	phone: {type: String, default: ''},
	country: {type: String, default: ''},
	gender: {type: String, enum: ['Male','Female','Undefined']},
	user: {type: String, unique: true, lowercase: true},
	password: {type: String},
	registerDate: {type: Date, default: Date.now()},
	lastLogin: Date
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

userSchema.methods.gravatar = function(){ //A partir de un email nos devuelve un avatar por defecto, si no está registrado
	if(!this.email)
		return `https://gravatar.com/avatar/?s=200&d=retro`
	const md5 = CRYPTO.createHash('md5').update(this.email).digest('hex') //En caso de que ya esté registrado en gravatar
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}


module.exports = MONGOOSE.model('User', userSchema)
