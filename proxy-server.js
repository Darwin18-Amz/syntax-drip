const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});