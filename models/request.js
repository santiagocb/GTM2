
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

var url = "mongodb://system:gtmroot@ds245518.mlab.com:45518/gtmdb"

var moon = MONGOOSE.connect(url)

function close() {
  moon.close()
}

var requestSchema = new SCHEMA({
	postCode: {type: String},
	requester: {type: String}
})

requestSchema.statics.findByPost = function(postCode, callback){
    this.find({postCode: new RegExp(postCode, 'i')}, callback);
};

module.exports = MONGOOSE.model('Request', requestSchema)
