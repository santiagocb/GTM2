
const USER = require('../models/user')
const SERVICE = require	('../services')
const BCRYPT = require('bcrypt-nodejs')
const FS = require('fs')

function signUp(req, res){
		var user = new USER({
		email: req.body.email,
		name: req.body.name,
		user: req.body.user,
		password: req.body.password
	})
	//console.log(req.body); //Mostrar mediante consola lo que se que está enviando por parámetro en el middleware
	USER.findOneByEmailOrUser(user.email, user.user, (err, foundUser) => {
		if(foundUser.length != 0) return res.status(409).send({message: 'Error creating the user: The unique field has already taken'})
		user.save((err) => {
			if (err) res.status(500).send({message: `Error creating the user: ${err}`})
			return res.status(201).send({message: 'The user has been signed up successfully'})
	 	})
	})
}

function signIn(req, res){
	USER.findOneByEmailOrUser(req.body.email, req.body.email, (err, user) => {
		if(err) return res.status(500).send({message: err})
		if(user.length == 0) return res.status(404).send({message: `The user does not exist`})
		BCRYPT.compare(req.body.contrasena, user[0].password, (err, result) => {			
				if(result)	{
					var token = SERVICE.createToken(user[0])
					res.status(200).send({
						success: true,
						message: 'Signed in correctly',
						token: token,
						name: user[0].name
				})
			}
			else { 
				return res.status(422).send({message: `The password does not match`}) 
			}
		})
	})
}

function updateUser(req, res){
	let current = {
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone,
		country: req.body.country,
		gender: req.body.gender,
		//password: req.body.contrasena,
		image: {
			data: FS.readFileSync(req.files.image.path),
			contentType: req.files.image.type
		}
	}
	let idUser = req.user	
	USER.findByIdAndUpdate(idUser, current, (err, userUpdated) => {		
		if(err) res.status(500).send({message: `Error updating the user information`})
		res.status(200).send({message: 'User information updated successfully'})
	})
}

module.exports = {
	signUp,
	signIn,
	updateUser
}
