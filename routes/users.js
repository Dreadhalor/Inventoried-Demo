const express = require('express');
const router = express.Router();
const moment = require('moment');
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
  let check_out_date = req.body.check_out_date;
  let due_date = req.body.due_date;
  if (user_uuid && asset_uuid && check_out_date && due_date){
    let params = {
      asset_uuid: req.body.asset_uuid,
      check_out_date: req.body.check_out_date,
      due_date: req.body.due_date
    };
    User.getUserByUUID(user_uuid, (err, user) => {
      if (err) throw err;
      else if (user){
        Asset.getAssetByUUID(asset_uuid, (err2, asset) => {
          if (err2) throw err2;
          else if (asset){
            let start = moment(check_out_date,'MMMM Do YYYY').isValid();
            let due = moment(due_date,'MMMM Do YYYY').isValid();
            if (start && due){
              user.checked_out_assets.push(params);
              user.save((err, saved) => {
                if (err) throw err;
                else if (saved){
                  res.json({
                    success: true,
                    result: saved
                  });
                } else res.json({success:false});
              })
            } else res.json({success:false});
          } else res.json({success:false});
        })
      } else res.json({success:false});
    })
  } else res.json({success:false});
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

router.get('/pull_assigned_assets', (req, res) => {
  let token = req.headers.authorization;
  User.decodeToken(token,(err, user) => {
    if (err) throw err;
    else if (user){
      res.json({
        success: true,
        result: user.checked_out_assets
      });
    } else res.json({success:false});
  });
});

module.exports = router;