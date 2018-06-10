var mongoose = require('mongoose')
var Schema = mongoose.Schema

var counter = new Schema({
  count: {type: Number, default: 1}
})

module.exports = mongoose.model('Counter', counter)