
const POST = require('../models/post')
const REQUEST = require('../models/request')
const FS = require('fs')

function createPost (req, res){
	//console.log(req.files);
	var post = new POST
		post.description = req.body.descripcion
		post.productName = req.body.nombre_producto
		post.type = req.body.categoria
		post.publisher = req.user
		post.image.data = FS.readFileSync(req.files.imagen.path)
		post.image.contentType = req.files.imagen.type

	post.save((err, postStored) => {
		if (err) res.status(500).send({message: `Error generation the post: ${err}`})
		res.status(201).send({ post: postStored})
 	})
}

function getAllPosts (req, res){
	POST.find({}).sort({date: 'asc'}).exec(function(err, posts) {
		var publish = posts
		if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
		if(!publish.length) return res.status(404).send({message: 'There are not posts'})

		for(i = 0; i < publish.length - 1; i++){
				let id = publish[i]._id
				REQUEST.findByPost(id, function(err, request) {
					if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
					publish[i].request = request.length
				})
				//console.log(publish[i])
	  }
		res.status(200).send(publish)
	})
}

function getMyPosts (req, res){
	POST.find({}).sort({date: 'asc'}).exec(function(err, posts) {
		if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
		if(!posts) return res.status(404).send('There are not posts')
		for (i = 0; i < posts.length; i++){				//Método para quitar las publicaciones de otros.
			if(posts[i].publisher != req.user){
				posts.splice(i, 1)
			}
		}
		res.status(200).send(posts)
	})
}

function getPost(req, res){
	let idPost = req.params.id
	POST.find({_id : idPost}, (err, post) => {
		if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
		if(!post) return res.status(404).send('The post does not exist')

		res.status(200).send({post})
	})
}

function deletePost (req, res){
	let idPost = req.params.idpost		//publicacionid

	POST.findById(idPost, (err, post) => {
		if(err) res.status(500).send({message: `Error deleting the post: ${err}`})

		post.remove(err => {
			if(err) res.status(500).send({message: `Error deleting the post: ${err}`})
			res.status(200).send({message: 'The post has been deleted successfully'})
		})
	})
}

function updatePost (req, res){
	let idPost = req.body.idpost
	let update = req.body

	POST.findByIdAndUpdate(idPost, update, (err, postUpdated) => {
		if(err) res.status(500).send({message: `Error updating the post: ${err}`})
		res.status(200).send({post: postUpdated})
	})
}



module.exports = {
	getAllPosts,
	getMyPosts,
	deletePost,
	updatePost,
	createPost,
	getPost
}
