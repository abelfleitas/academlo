const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public/'));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor web escuchando en el puerto ${PORT}...`);
});