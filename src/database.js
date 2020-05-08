const { Client } = require('pg')
var fs = require('fs');
const client = new Client()

doMigrations()

async function doMigrations(){
  var sql = fs.readFileSync('./src/migration.sql').toString();
  var res = await pgQuery(sql)
  console.log(res)
} 

async function pgQuery(sql, arrData){
  await client.connect()
  const res = await client.query(sql, arrData)
  await client.end()
  return res
}





function saveLog(){

}

function saveTotal(){
  
}

module.exports = {
  saveLog,
  saveTotal
}