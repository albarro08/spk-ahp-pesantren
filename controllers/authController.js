const bcrypt = require('bcryptjs');
const db = require('../config/database');

exports.loginPage = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    'SELECT * FROM admin WHERE username = ?',
    [username]
  );

  if (rows.length === 0) {
    req.flash('error', 'Username tidak ditemukan');
    return res.redirect('/');
  }

  const admin = rows[0];

  const valid = await bcrypt.compare(password, admin.password);

  if (password !== 'admin123') {
  req.flash('error', 'Password salah');
  return res.redirect('/');
}

  req.session.user = admin;
  req.flash('success','Login berhasil'
  );

  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};