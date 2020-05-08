const { Client } = require('pg')
var fs = require('fs');

doMigrations()

var totalSql = fs.readFileSync('./src/voteTotal.sql').toString();
var logSql = fs.readFileSync('./src/voteLog.sql').toString();


async function doMigrations(){
  var sql = fs.readFileSync('./src/migration.sql').toString();
  var res = await pgQuery(sql)
  console.log(res)
} 

async function pgQuery(sql, arrData){
  const client = new Client()
  await client.connect()
  const res = await client.query(sql, arrData)
  await client.end()
  return res
}





async function saveLog(data){
  var arr = [
    data.idUser,
    data.ipUser.ip,
  ]
  for (let [key, value] of Object.entries(data.heroes)) {
    arr.push(key)
    arr.push(value.hT)
    arr.push(value.s || false)
  }
  arr.push(data.roundTime)
  console.log(arr)
  var res = await pgQuery(logSql, arr)
  console.log(res)
}

async function saveTotal(data){
  var res = await pgQuery(totalSql, data)
}

module.exports = {
  saveLog,
  saveTotal
}