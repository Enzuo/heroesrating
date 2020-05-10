const express = require('express')
const bodyParser = require('body-parser')
const expressip = require('express-ip');

require('dotenv').config()
const api = require('./src/api')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(expressip().getIpInfoMiddleware)

app.post('/', api.vote)

/**
 * results
 */
app.get('/total', api.result.getTotal)


/**
 * 404
 */
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


/**
 * start
 */
app.listen(port, () => console.log(`--> Heroes rating server listening at http://localhost:${port}`))