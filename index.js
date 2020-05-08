const express = require('express')
const bodyParser = require('body-parser')
const expressip = require('express-ip');

require('dotenv').config()
const database = require('./src/database')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(expressip().getIpInfoMiddleware)

app.post('/', function (req, res) {
  var heroesRound = req.body
  var heroes = heroesRound.h
  var roundTime = heroesRound.rT
  var idUser = heroesRound.u
  var ipUser = req.ipInfo
  console.log(heroes, roundTime, idUser, ipUser)

  // prevent combo/system abuse
  // user can't vote more than 30 times to avoid one having too much weight

  // save log
  database.saveLog({heroes, roundTime, idUser, ipUser})

  // calculate added score
  var heroesArr = []
  for (let [key, value] of Object.entries(heroes)) {
    var idHero = key
    if(value.s){
      score = 3
      if(roundTime < 3000 ){
        score += 1
      }
    }
    else {
      score = -2
      if(roundTime > 3000 ){
        score += 1
      }
      if(value.hT > 2000 ){
        score += 1
      }
    }
    heroesArr.push(idHero)
    heroesArr.push(score)
  }
  console.log(heroesArr)

  // save total
  database.saveTotal(heroesArr)

  res.status(200).send('ok')
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.listen(port, () => console.log(`--> Heroes rating server listening at http://localhost:${port}`))