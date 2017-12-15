
const REQUEST = require('../models/request')

function createRequest(req, res){
    let id = req.params.id
		var request = new REQUEST({
  		postCode: id,
		  requester: req.user
	})

  REQUEST.find({postCode: id, requester: req.user}, (err, requestFound) => {
    if(err) return res.status(500).send({message: `Error executing the request: ${err}`})
    //console.log(requestFound.length)
		if(!requestFound.length){
      request.save((err) => {
    		if (err) res.status(500).send({message: `Error creating the request: ${err}`})
    		return res.status(201).send({message: 'The request has been created successfully'})
     	})
    }
    if(requestFound.length) return res.status(200).send({message: 'The request already exists'})
  })

}

function deleteRequest (req, res){
	let idPost = req.params.id

	REQUEST.findById(idPost, (err, request) => {
		if(err) res.status(500).send({message: `Error deleting the request: ${err}`})

		request.remove(err => {
			if(err) res.status(500).send({message: `Error deleting the request: ${err}`})
			res.status(200).send({message: 'The request has been deleted successfully'})
		})
	})
}

module.exports = {
  createRequest,
  deleteRequest
}
