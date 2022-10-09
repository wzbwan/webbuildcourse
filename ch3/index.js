var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var stdata = require("./data")

let data = stdata.concat([])

app.use(express.static(path.join(__dirname,'/client/build')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", (request, response)=>{
  response.send(__dirname+'/index.html')
})

app.post("/login", (req, res) => {
  var hasUser = false
  console.log("/login",req.body)
  if (req.body.password != 'abcdef') {
    res.json({
      status: -1,
      message: '密码错误',
      user:{}
    })
  }else{
    data.forEach(std => {
      if (std.sid === req.body.username) {
        hasUser = true
        res.json({
          status: 1,
          message:'成功',
          user: std
        })
      }
    });
    if (!hasUser) {
      res.json({
        status: -1,
        message: '未找到该用户',
        user:{}
      })  
    }
  }
})

app.post("/bet", (req, res) => {
  data.forEach(std => {
    if (std.sid === req.body.sid) {
      std.amount += parseInt(req.body.betData)
      res.json({
        amount : std.amount
      })
    }
  });
})

app.post("/rank", (req, res) => {
  res.json(data)
})

var server = app.listen(8000, ()=>{
  var host = server.address().address
  var port = server.address().port
  console.log("server listen on port",port)
})


