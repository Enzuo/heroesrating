const { Client } = require('pg')
var fs = require('fs');

doMigrations()

var totalSql = fs.readFileSync('./src/total.sql').toString();


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





function saveLog(){

}

async function saveTotal(data){
  var res = await pgQuery(totalSql, data)
  console.log(res)
}

module.exports = {
  saveLog,
  saveTotal
}