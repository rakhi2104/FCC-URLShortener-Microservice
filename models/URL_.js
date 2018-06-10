var mongoose = require('mongoose')
var Schema = mongoose.Schema

var url_ = new Schema({
  url: {type: String, required: true},
  index: {type: Number, required: true}
})

module.exports = mongoose.model('Url_', url_)