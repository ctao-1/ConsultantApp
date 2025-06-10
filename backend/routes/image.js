const express = require('express');
const router = express.Router();
const pool = require('../db_reserve');  // 连接 PostgreSQL

router.get('/', async (req, res) => {

  try {
    const result = await pool.query(
      `SELECT profile_picture FROM consultants`
    );

    if (result.rows.length === 0 || !result.rows[0].image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imageBinary = result.rows[0].image;
    const base64Image = imageBinary.toString('base64');
    res.json({ image: base64Image });
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;  // ✅ 关键：要正确导出 router
