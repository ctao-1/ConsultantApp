const express = require('express')
const router = express.Router()
const pool = require('../db_reserve') // 已连接的 pg client pool

router.post('/', async (req, res) => {
    const { user_name, consultant_id, reserve_date } = req.body

    try {
        await pool.query(
            'INSERT INTO reserve(user_name, consultant_id, reserve_date) VALUES ($1, $2, $3)',
            [user_name, consultant_id, reserve_date]
        )
        res.status(201).json({ message: '预约成功' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: '预约失败' })
    }
})
module.exports = router
