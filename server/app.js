const express = require('express');//framework pt serverul web
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
//cors- permite serverelor sa controleze cine poate accesa resursele lor si cum
const cors = require('cors');



//configurarea mediului bd
dotenv.config({ path: './config/.env' });
const { readdirSync } = require('fs');
// Passport Config-middleware pt autentificare
require('./config/passport')(passport);

// Set up Express app--pt a permite solicitari din afara domeniului serverului
const app = express();
app.use(cors());

//middleware pt analiza cererilor json
app.use(express.json());

// Import  router prinicpal
const indexRouter = require('./routes/index');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up middleware suplimentare
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set up global flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
const transactionRouter = require('./routes/transaction');
//toate cererile care incep cu /api
app.use('/api', transactionRouter);

// Set up routes
app.use('/', indexRouter);
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, '../client/build')));
//cale catre client-dashboard


app.get('/welcome', (req, res) => {
  res.render('welcome');
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
}); //cale catre fisierul index.html
// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
