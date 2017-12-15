
const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

var requestSchema = new SCHEMA({
	postCode: {type: String},
	requester: {type: String}
})

requestSchema.statics.findByPost = function(postCode, callback){
    this.find({postCode: new RegExp(postCode, 'i')}, callback);
};

module.exports = MONGOOSE.model('Request', requestSchema)
