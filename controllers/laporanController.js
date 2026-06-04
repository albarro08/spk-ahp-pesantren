const db = require('../config/database');
const { calculateAHP } = require('../utils/ahp');

exports.print = async (req, res) => {

  const [kriteria] = await db.query('SELECT * FROM kriteria');
  const [perbandingan] = await db.query('SELECT * FROM perbandingan');

  const hasil = calculateAHP(kriteria, perbandingan);

  res.render('laporan/print', { hasil });

};