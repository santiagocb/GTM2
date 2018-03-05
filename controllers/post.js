
const POST = require('../models/post')
const REQUEST = require('../models/request')
const USER = require('../models/user')
const FS = require('fs')

function createPost (req, res){
	var post = new POST
		post.description = req.body.description
		post.productName = req.body.productName
		post.type = req.body.type
		post.publisher = req.user
		//post.image.data = FS.readFileSync(req.files.image.path)
		//post.image.contentType = req.files.image.type

	post.save((err, postStored) => {
		if (err) return res.status(500).send({message: `Error generating the post`})
		return res.status(201).send({message:'Post created successfully'})
 	})
}

async function getAllPosts (req, res){
	try {
		var data = await POST.find({}, ['-__v', '-expirationDate'], {publicationDate: 1}).populate('publisher')
		var posts = []
		data.forEach(element => {
			var json = {}
			json.description = element.description
			json.productName = element.productName
			json.type = element.type
			json.request = element.request
			json._id = element._id
			json.publicationDate = element.publicationDate
			json.image = element.image
			json.publisher = element.publisher.user
			
			posts.push(json)		
		})
		res.status(200).send(posts)
	} catch (error) {
		res.status(500).send({message: 'Server error'})
	}	
}

function getMyPosts (req, res){
	POST.find({}).sort({date: 'asc'}).exec(function(err, posts) {
		if(err) return res.status(500).send({message: `Error executing the request: ${err}`})		
		for (i = 0; i < posts.length; i++){				//Método para quitar las publicaciones de otros.
			if(posts[i].publisher != req.user){
				posts.splice(i, 1)
				i--;
			}
		}
		if(!posts.length) return res.status(200).send({message: 'There are not posts'})
		return res.status(200).send(posts)
	})
}

function getPost(req, res){
	let publisher = req.params.nickname
	let postId = req.params.postid
	POST.findbyPublisher(postId, '-__v', '-expirationDate', (err, post) => {
		if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
		if(!post) return res.status(404).send({message: 'The post does not exist'})
		return res.status(200).send({post})
	})
	//return res.status(200).send(user)
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
