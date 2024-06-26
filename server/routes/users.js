const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Import the User model
const User = require('../models/Users');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, phone, email, city, urc, company, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !phone || !city || !urc || !company || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      phone,
      city,
      urc,
      company,
      password,
      password2
    });
  } else {
    // Validation passed, check if user exists
    User.findOne({ email: email }).then(user => {
      if (user) {
        // If user already exists
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          phone,
          city,
          urc,
          company,
          password,
          password2
        });
      } else {
        // Create new user
        const newUser = new User({
          name,
          email,
          phone,
          city,
          urc,
          company,
          password
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newUser.password = hash;

            // Save user
            newUser.save().then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            }).catch(err => console.log(err));
          }));
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, () => {
    // Store user ID in the session
    req.session.userId = req.user._id;
    next();
  });
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



module.exports = router;
