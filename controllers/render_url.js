var url_model = require('../models/URL_.js');
var coun = require('../models/counters.js');

function inc_count(req, res, callb) {
  
  url_model.count((err, data)=>{
    console.log(data)
    callb(data)
  })
  
}



exports.genURL = (req, res) =>{
  var base_url = req.body.url
  
  url_model.findOne({"url": base_url}, (err, data)=>{
    if(err) return;
    if(data)
      res.send({"original_url":data.url, "short_url":data.index})
    else {
      inc_count(req, res, (count)=>{
        console.log(count)
        var new_url = new url_model({
          url: base_url,
          index: count+1
        })

        new_url.save(err =>{
          if(err) console.log(err)
          res.send({"original_url":base_url, "short_url":count+1})
        })
      })
      
    }
  })
}

exports.getURL = (req, res) =>{
  var req_id = req.params.qu
  
  url_model.findOne({"index": req_id}, (err, data)=>{
    if(err) return;
    if(data){
      res.send({"original_url":data.url, "short_url":data.index})
    }
    else {
      res.send('Sorry, requested Short URL not found with us')
    }
  })
}