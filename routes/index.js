
const EXPRESS = require('express')
const AUTH = require('../middlewares/auth')
const GTM = EXPRESS.Router()

var postController = require('../controllers/post')
var userController = require('../controllers/user')
var requestController = require('../controllers/request')

//endpoint generar publicacion
GTM.post('/publicacion', AUTH, postController.createPost)
//endpoint enviar todas las publicaciones
GTM.get('/publicacion', AUTH, postController.getAllPosts)
//enpoint para ver todas las publicaciones del usuario en sesion
GTM.get('/misPublicaciones', AUTH, postController.getMyPosts)
//endpoint para las publicaciones hechas por el usuario
GTM.get('/publicacion/:id', AUTH, postController.getPost)
//endpoint eliminar publicacion
GTM.delete('/publicacion/:publicacionid', AUTH, postController.deletePost)
//endpoint actualizar publicacion


//endpoint para un usuario
GTM.post('/signUp', userController.signUp)
//endpoint para login
GTM.post('/signIn', userController.signIn)
//endpoint para modificar perfil
GTM.put('/perfil', AUTH, userController.updateUser)


//endpoint para solicitud
GTM.post('/publicacion/:id', AUTH, requestController.createRequest)
//borrar solicitud
GTM.delete('/solicitud/:id', AUTH, requestController.deleteRequest)


module.exports = GTM
