const express = require('express');
const router = express.Router();
const path = require('path');
const app = express(); //se defineste aplicatai express

router.get('/', (req, res) => {
  res.render('welcome'); //cu res render- se afiseaza pagina welcome existenta deja
});
//se realizeaza conexiunea cu app din client
app.use(express.static(path.join(__dirname, '../client/build')));

module.exports = router;
