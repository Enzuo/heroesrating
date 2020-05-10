const database = require('../database')

/**
 * body : {
 *  h:{
 *    87:{   // idHero 
 *      hT,  // hover Time
 *      s,   //selected
 *    },
 *  },
 *  rT: 1000,      // round Time
 *  u: 1523023200, // idUser
 * }
 */

module.exports = function (req, res) {
  var heroesRound = req.body
  var heroes = heroesRound.h
  var roundTime = heroesRound.rT
  var idUser = heroesRound.u
  var ipUser = req.ipInfo
  console.log(heroes, roundTime, idUser, ipUser)

  // prevent combo/system abuse
  // start pushing in database after 3-5 from same user
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
}