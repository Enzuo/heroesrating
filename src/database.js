const { Pool } = require('pg')
var fs = require('fs');
const pool = new Pool()

doMigrations()

var saveTotalSql = fs.readFileSync('./src/voteTotal.sql').toString();
var saveLogSql = fs.readFileSync('./src/voteLog.sql').toString();
var getTotalSql = fs.readFileSync('./src/getTotal.sql').toString();


async function doMigrations(){
  try {
    var sql = fs.readFileSync('./src/migration.sql').toString();
    var res = await pgQuery(sql)
  }
  catch(e){
    console.log('--> Migration error', e.message)
  }
} 

async function pgQuery(sql, arrData){
  const res = await pool.query(sql, arrData)
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
  var res = await pgQuery(saveLogSql, arr)
  console.log(res)
}

async function saveTotal(data){
  var res = await pgQuery(saveTotalSql, data)
}

async function getTotal(){
  var res = await pgQuery(getTotalSql)
  return res.rows
}

module.exports = {
  saveLog,
  saveTotal,
  getTotal,
}