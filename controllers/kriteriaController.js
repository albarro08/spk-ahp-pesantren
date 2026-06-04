const db = require('../config/database');

exports.index = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM kriteria');
  res.render('kriteria/index', { kriteria: rows });
};

exports.store = async (req, res) => {
  const { nama } = req.body;

  await db.query(
    'INSERT INTO kriteria (nama) VALUES (?)',
    [nama]
  );

  req.flash('success', 'Kriteria berhasil ditambah');
  res.redirect('/kriteria');
};

exports.update = async (req, res) => {
  const { nama } = req.body;

  await db.query(
    'UPDATE kriteria SET nama=? WHERE id=?',
    [nama, req.params.id]
  );

  req.flash('success', 'Kriteria berhasil diupdate');
  res.redirect('/kriteria');
};

exports.delete = async (req, res) => {
  await db.query('DELETE FROM kriteria WHERE id=?', [req.params.id]);

  req.flash('success', 'Kriteria berhasil dihapus');
  res.redirect('/kriteria');
};