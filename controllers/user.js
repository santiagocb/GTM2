
const USER = require('../models/user')
const SERVICE = require	('../services')
const BCRYPT = require('bcrypt-nodejs')

function signUp(req, res){
		var user = new USER({
		email: req.body.correo,
		name: req.body.nombre,
		user: req.body.usuario,
		password: req.body.contrasena
	})
	//console.log(req.body); //Mostrar mediante consola lo que se que está enviando por parámetro en el middleware
	user.save((err) => {
		if (err) res.status(500).send({message: `Error creating the user: ${err}`})
		return res.status(201).send({message: 'The user has been signed up successfully'})
 	})
}

function signIn(req, res){
	USER.findOneByEmail(req.body.correo, (err, user) => {
		if(err) return res.status(500).send({message: err})
		if(!user) return res.status(404).send({message: `The user does not exist`})
		BCRYPT.compare(req.body.contrasena, user.password, (err, result) => {
				if(result)	{
					var token = SERVICE.createToken(user)
					res.status(200).send({
						success: true,
						message: 'Signed in correctly',
						token: token,
						name: user.user
				})
			}
			else { return res.status(422).send({message: `The password does not match`}) }
		})
	})
}

function updateUser(req, res){
	let current = req.body
	//console.log(SERVICE.decodeToken(token)) //no se hace uso del decode acá porque ya esta en req.user
	let idUser = req.user
	USER.findByIdAndUpdate(idUser, current, (err, userUpdated) => {
		if(err) res.status(500).send({message: `Error updating the user information: ${err}`})
		res.status(200).send({userUpdated})
	})
}


module.exports = {
	signUp,
	signIn,
	updateUser
}
