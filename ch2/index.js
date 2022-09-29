var express = require('express')
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname,'/client/build')))

app.get("/", (request, response)=>{
  response.send(__dirname+'/index.html')
})

var server = app.listen(7777, ()=>{
  var host = server.address().address
  var port = server.address().port
  console.log("server listen on port",port)
})


