const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/Users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({ username, password: hash });
    const saveUser = user.save();
    saveUser.then(result => {
      res.status(201).json(result);
    })
      .catch(err => { res.status(500).json({ message: err }) });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) throw err;

    if (!user) res.status(404).json({ status: false, message: 'User is Not Found..!' });
    else {
      bcrypt.compare(password, user.password).then(result => {
        if (!result) res.json({ status: false, message: 'Password is wrong..!' });
        else {
          const apikey = req.app.get('API_SECRET_KEY');
          const token_ = generateToken(username, apikey);
          res.status(200).json({
            status: true,
            token_,
            username
          });
        }
      });
    }
  });
});


router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err, data) => {
    if (err)
      throw err;

    if (!data) {
      res.status(404).json({ status: false, message: 'Authentication failed, user not found.!' });
    } else {
      bcrypt.compare(password, data.password).then((result) => {
        if (!result)
          res.status(404).json({ status: false, message: 'Authentication failed, wrong password..!' });
        else {
          // const payload = {username};
          // const token = jwt.sign(payload, req.app.get('API_SECRET_KEY'), {expiresIn: 720}); //720 dk 12 saate denk geliyo
          // res.status(200).json({
          //   status: true,
          //   token
          // });
          const apikey = req.app.get('API_SECRET_KEY');
          const token_ = generateToken(username, apikey);
          res.status(200).json({
            status: true,
            token_
          });
        }
      });
    }
  });

  //with promise
  // const userFind = User.findOne({username});
  // userFind.then(data => {
  //   if (!data)
  //     res.status(404).json({ status: false, message: 'Authentication failed, user not found.!' });
  //   else {
  //     bcrypt.compare(password, data.password).then(result => {
  //       if (!result)
  //         res.status(404).json({ status: false, message: 'Authentication failed, wrong password..!' });
  //       else {
  //         const payload = { username };
  //         const token = jwt.sign(payload, req.app.get('API_SECRET_KEY'), { expiresIn: 720 }); //720 dk 12 saate denk geliyo
  //         res.status(200).json({
  //           status: true,
  //           token
  //         });
  //       }
  //     })
  //     .catch(err => res.status(404).json({ status: false, message: 'Authentication failed, wrong password..!' }));
  //   }
  // })
  // .catch(err => {throw err});
});

const generateToken = (requestUser, apikey) => {
  const payload = { requestUser };
  const token = jwt.sign(payload, apikey, { expiresIn: 720 }); //720 dk 12 saate denk geliyo
  return token;
}

module.exports = router;
