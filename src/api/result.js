const database = require('../database')
const heroes = require('../../public/js/heroes.json')


async function getTotal(req, res) {
  var data = await database.getTotal()
  for(var i=0; i<data.length; i++){
    data[i].name = heroes[data[i].idHero].name
  }
  res.send(data)
}

module.exports = {
  getTotal,
}