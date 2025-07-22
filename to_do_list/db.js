const { Pool } = require('pg');

// PostgreSQL bağlantısı
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234', // burayı kendi PostgreSQL şifrenle değiştir
  database: 'to_do_list',
  port: 5432
});

// Bu bağlantıyı diğer dosyalarda kullanmak için dışa aktar
module.exports = pool;
