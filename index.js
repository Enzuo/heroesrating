const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/', function (req, res) {
  console.log(req.body)
  res.status(200).send('ok')
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))