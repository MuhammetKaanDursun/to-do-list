const express = require('express');
const router = express.Router();
const pool = require('../db');

//SELECT QUERY
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

//İNSERT QUERY
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});
//UPDATE QUERY
router.put('/:id', async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE todos SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Görev bulunamadı');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

//DELETE QUERY
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Görev bulunamadı');
    }

    res.json({ message: 'Görev silindi', deleted: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
