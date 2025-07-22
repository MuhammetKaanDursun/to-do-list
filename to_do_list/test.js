

const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' Bağlantı hatası:', err.message);
  } else {
    console.log(' Bağlantı başarılı:', res.rows[0]);
  }
  pool.end();
});
