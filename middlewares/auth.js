
const SERVICES = require('../services')

function isAuth (req, res, next){
	if(!req.headers.authorization){
		//console.log(req.headers.authorization)
		return res.status(401).send({ message: 'Be sure you have permission to execute this action'}) 

	}

//split para separar el beater y el tken que componen la cabecera de autorizacion
	const TOKEN = req.headers.authorization.split(" ")[1] //Crea un array por cada espacio que haya. Y se obtiene el token [1]
    SERVICES.decodeToken(TOKEN) 				//Va a la promesa declarada en SERVICES
    	.then(response => {
    		req.user = response
    		next()
    	})
    	.catch(response => {
    		res.status(response.status)
    	})
}

module.exports = isAuth
