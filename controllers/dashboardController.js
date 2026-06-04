const db = require('../config/database');
const { calculateAHP } = require('../utils/ahp');

exports.index = async (req, res) => {
  const [kriteria] = await db.query('SELECT * FROM kriteria');
  const [perbandingan] = await db.query('SELECT * FROM perbandingan');

  const hasil = calculateAHP(kriteria, perbandingan);

  res.render('dashboard/index', {
    totalKriteria: kriteria.length,
    totalPerbandingan: perbandingan.length,
    hasil
  });
};