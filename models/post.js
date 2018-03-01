
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

var url = "mongodb://system:gtmroot@ds245518.mlab.com:45518/gtmdb"

var moon = MONGOOSE.connect(url)

function close() {
  moon.close()
}

var postSchema = new SCHEMA({
	description: {type: String},
	productName: {type: String},
	image: {data: Buffer, contentType: String},
	type: {type: String},
	publisher: {type: String},
	request: {type: Number, default: 0},
	publicationDate: {type: Date, default: Date.now},
	expirationDate: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)} // Date in one week from now
})

postSchema.statics.findByPublisher = function(publisher, callback){
	this.find({publisher: publisher}, callback)
};

module.exports = MONGOOSE.model('Post', postSchema)
