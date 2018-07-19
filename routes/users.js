const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register_user', (req, res) => {
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
  }
});

module.exports = router;