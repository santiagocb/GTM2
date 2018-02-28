
const EXPRESS = require('express')
const AUTH = require('../middlewares/auth')
const GTM = EXPRESS.Router()

var postController = require('../controllers/post')
var userController = require('../controllers/user')
var requestController = require('../controllers/request')

//SE QUITA EL AUTH EN TODOS PARA PROBAR
//endpoint generar publicacion
GTM.post('/post', AUTH, postController.createPost)
//endpoint enviar todas las publicaciones
GTM.get('/', postController.getAllPosts)
//enpoint para ver todas las publicaciones del usuario en sesion
GTM.get('/myposts', postController.getMyPosts)
//endpoint para las publicaciones hechas por el usuario
GTM.get('/post/:id', postController.getPost)
//endpoint eliminar publicacion
GTM.delete('/post/:postid', postController.deletePost)
//endpoint actualizar publicacion


//endpoint para registrar un usuario
GTM.post('/signup', userController.signUp)
//endpoint para login
GTM.post('/signin', userController.signIn)
//endpoint para modificar perfil
GTM.put('/profile', AUTH, userController.updateUser)
//endpoint para ver perfil de un usuario
GTM.get('/:nickname', AUTH, userController.viewUser)


//endpoint para solicitud
GTM.post('/post/:id', AUTH, requestController.createRequest)
//borrar solicitud
GTM.delete('/request/:id', AUTH, requestController.deleteRequest)


module.exports = GTM
