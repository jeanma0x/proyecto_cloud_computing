const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a la base de datos AWS RDS');
    connection.release();
  })
  .catch(error => {
    console.error('❌ Error conectando a la base de datos:', error);
  });

// Verificar base de datos actual
pool.execute('SELECT DATABASE() as current_db')
  .then(([rows]) => {
    console.log('Base de datos actual:', rows[0].current_db);
  })
  .catch(console.error);

module.exports = pool;