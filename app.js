require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();


// ======================
// VIEW ENGINE
// ======================

app.set('view engine', 'ejs');


// ======================
// MIDDLEWARE
// ======================

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));


// ======================
// SESSION
// ======================

app.use(session({

  secret: 'spk-ahp-secret-key',

  resave: false,

  saveUninitialized: false,

  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }

}));


// ======================
// FLASH MESSAGE
// ======================

app.use(flash());

app.use((req, res, next) => {

  res.locals.success =
    req.flash('success');

  res.locals.error =
    req.flash('error');

  res.locals.user =
    req.session.user || null;

  next();

});


// ======================
// ROUTES
// ======================

app.use('/',
  require('./routes/authRoutes')
);

app.use('/dashboard',
  require('./routes/dashboardRoutes')
);

app.use('/kriteria',
  require('./routes/kriteriaRoutes')
);

app.use('/ahp',
  require('./routes/ahpRoutes')
);

app.use('/laporan',
  require('./routes/laporanRoutes')
);


// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});