const db = require('../config/database');
const { calculateAHP } = require('../utils/ahp');

exports.index = async (req, res) => {
  const [kriteria] = await db.query('SELECT * FROM kriteria');
  const [perbandingan] = await db.query('SELECT * FROM perbandingan');

  res.render('ahp/input', {
    kriteria,
    perbandingan
  });
};

exports.store = async (req, res) => {
  const { kriteria1, kriteria2, nilai } = req.body;

  if (kriteria1 == kriteria2) {
    req.flash('error', 'Kriteria tidak boleh sama');
    return res.redirect('/ahp');
  }

  await db.query(
    'INSERT INTO perbandingan (kriteria1, kriteria2, nilai) VALUES (?, ?, ?)',
    [kriteria1, kriteria2, nilai]
  );

  req.flash('success', 'Data berhasil disimpan');
  res.redirect('/ahp');
};

exports.hasil = async (req, res) => {
  const [kriteria] = await db.query('SELECT * FROM kriteria');
  const [perbandingan] = await db.query('SELECT * FROM perbandingan');

  const hasil = calculateAHP(kriteria, perbandingan);

  res.render('ahp/hasil', { hasil });
};

exports.rekomendasi = async (req, res) => {

  const total = Number(req.query.total || 0);

  const [kriteria] = await db.query(
    'SELECT * FROM kriteria'
  );

  const [perbandingan] = await db.query(
    'SELECT * FROM perbandingan'
  );

  const hasil = calculateAHP(
    kriteria,
    perbandingan
  );

  res.render('ahp/rekomendasi', {
    hasil,
    total
  });

};

exports.reset = async (req, res) => {

  await db.query(
    'DELETE FROM perbandingan'
  );

  req.flash(
    'success',
    'Data perbandingan berhasil direset'
  );

  res.redirect('/ahp');

};