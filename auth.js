const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

module.exports = function(sessionStore) {
  // Render the login page
  router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') || [] });
  });

  // Handle authentication and redirect to chat page
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/chat',
      failureRedirect: '/login',
      failureFlash: true, // Enable flash messages
    })
  );

  // Render the signup page
  router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') || [] });
  });

  // Handle signup and redirect to login page
  router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        req.flash('error', 'Username already exists.');
        return res.redirect('/signup');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username: username, password: hashedPassword });
      await newUser.save();
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      req.flash('error', 'An error occurred. Please try again.');
      res.redirect('/signup');
    }
  });

  // Handle logout and redirect to login page
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  return router;
};
