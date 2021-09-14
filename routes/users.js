const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const router = express.Router();

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { email, pass } = req.body
  if (email && pass) {
    const hasUser = await User.find({ email })

    if (!hasUser.length) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pass, salt, async (err, hash) => {
          // Store hash in your password DB.
          const newUser = await User.create({ email, pass: hash })
          req.session.user = newUser
          res.redirect('/')
        });
      });
    } else {
      const errorUserExits = "Такой адрес есть в базе!"
      res.render('signup', { errorUserExits })

    }
  } else {
    const errorInput = "Заполните все поля"
    res.render('signup', { errorInput })
  }
})

router.get('/signout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/');
});

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.post('/signin', async (req, res) => {
  const { email, pass } = req.body // pаss  - пароль введенный пользователем 
  const user = await User.findOne({ email }) //user.pass - пароль в базе данных
  if(!user){
    const errorMessage = "Неверный логин или пароль"
  }else{

        bcrypt.compare(pass, user.pass, (err, result) => { //Проверка ялвяется ли кешированная версия пароля, который вводит пользователь равный паролю базы данных
          if (result) {
            req.session.user = user
            res.redirect('/')
          }
        
      
    });
  }
})



module.exports = router;
