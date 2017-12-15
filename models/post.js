
const MOONGOSE = require('mongoose')
const SCHEMA = MOONGOSE.Schema

var postSchema = new SCHEMA({
	description: {type: String},
	productName: {type: String},
	//imagen: {data: String},
	type: {type: String},
	publisher: {type: String},
	request: {type: Number, default: 0},
	publicationDate: {type: Date, default: Date.now},
	expirationDate: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)} // Date in one week from now
})

postSchema.statics.findByPublisher = function(publisher, callback){
    this.find({publisher: new RegExp(publisher, 'i')}, callback);
};

module.exports = MOONGOSE.model('Post', postSchema)
