const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Asset = require('../models/asset');

router.post('/register', (req, res) => {
  let uuid = req.body.uuid;
  let email = req.body.email;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let password = req.body.password;
  if (uuid && email && first_name && last_name && password){
    let params = {
      uuid: uuid,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password
    };
    User.addUser(params, (err, added) => {
      if (err){
        console.log(err);
        res.json({success:false});
      } else if (added) {
        res.json({
          success: true,
          result: added
        });
      } else {
        res.json({success:false});
      }
    })
  } else res.json({success: false});
});
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password){
    let params = {
      email: email,
      password: password
    };
    User.checkCredentials(params, (err, valid) => {
      if (err){
        console.log(err);
        res.json({success:false});
      } else if (valid) {
        res.json({
          success: true,
          result: valid
        });
      } else {
        res.json({success:false});
      }
    })
  }
});
router.post('/checkout', (req, res) => {
  let user_uuid = req.body.user_uuid;
  let asset_uuid = req.body.asset_uuid;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  if (user_uuid && asset_uuid && start_date && due_date){
    let params = {
      user_uuid: req.body.user_uuid,
      asset_uuid: req.body.asset_uuid,
      start_date: req.body.start_date,
      due_date: req.body.due_date
    };
    console.log(params);
  }
})

router.get('/pull_all', (req, res) => {
  User.pullAllUsers((err,suc) => {
    if (err){
      console.log(err);
      res.json({success: false});
    }
    else {
      res.json({
        success: true,
        result: suc
      });
    }
  })
});

module.exports = router;