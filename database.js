const { DatabaseSync } = require('node:sqlite')
const dataBase = new DatabaseSync('usuarios.db')

dataBase.exec(`

    CREATE TABLE IF NOT EXISTS list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  describe TEXT,
  note INTEGER
)`)

module.exports = dataBase