const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Adresse de ton serveur MySQL
  user: 'ton_utilisateur',
  password: 'ton_mot_de_passe',
  database: 'ta_base_de_donnees',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
