const express = require('express');
const cors = require('cors');
const app = express();

const imageRoute = require('./routes/image'); // 新增
const reserveRoute = require('./routes/reserveconsultant'); // 新增
const consultants = require('./routes/consultants');

app.use(cors());
app.use(express.json())
app.use('/api/image', imageRoute); // 新增
app.use('/api/reserve', reserveRoute); // 新增s
app.use('/api/consultant', consultants);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ 后端启动失败:', err);
});
