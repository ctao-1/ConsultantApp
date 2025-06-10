const express = require('express');
const router = express.Router();
const pool = require('../db_reserve');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, title, specialties, experience, rate, 
      is_online, education, certification, code, bio, profile_picture
      FROM consultants
    `);
    // 将图片字段转为 base64
    const consultants = result.rows.map(row => {
      let base64Image = null;
      if (row.profile_picture) {
        base64Image = row.profile_picture.toString('base64');
      }
      return {
        ...row,
        profile_picture: base64Image
      };
    });

    res.json(consultants);
  } catch (err) {
    console.error('Error fetching consultants:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
