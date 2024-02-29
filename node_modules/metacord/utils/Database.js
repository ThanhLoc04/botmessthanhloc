const Database = require('better-sqlite3');
const fs = require('fs');

if (!fs.existsSync(process.cwd() + '/MetaCord_Database')) {
    fs.mkdirSync(process.cwd() + '/MetaCord_Database');
    fs.writeFileSync(process.cwd() + '/MetaCord_Database/Do not delete this folder or any of the files in it', '', 'utf8');
}
var db = new Database(process.cwd() + "/MetaCord_Database/Database.sqlite");


db.exec("CREATE TABLE IF NOT EXISTS MetaCord (key TEXT, value TEXT)");

function setKeyValue(key, value) {
  const insertStatement = db.prepare("INSERT INTO MetaCord (key, value) VALUES (?, ?)");
  insertStatement.run(key, value);
}

function getKeyValue(key) {
  const selectStatement = db.prepare("SELECT value FROM MetaCord WHERE key = ?");
  const data = selectStatement.get(key);
  return data ? data.value : null;
}

function CreateJson(name, value) {
  if (!fs.existsSync(process.cwd() + '/MetaCord_Database/' + name)) {
    fs.writeFileSync(process.cwd() + '/MetaCord_Database/' + name, JSON.stringify(value, null, 2));
  }
}

function GetJson(name) {
  if (fs.existsSync(process.cwd() + '/MetaCord_Database/' + name)) {
    return JSON.parse(fs.readFileSync(process.cwd() + '/MetaCord_Database/' + name, 'utf-8'));
  }
}


module.exports = {
  setKeyValue,
  getKeyValue,
  CreateJson,
  GetJson
};
