const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');

router.post('/add-asset', (req, res) => {
  let uuid = req.body.uuid;
  let serial_number = (req.body.serial_number) ? req.body.serial_number : '';
  let category = (req.body.category) ? req.body.category : 0;
  let status = (req.body.status) ? req.body.status : 0;
  if (uuid){
    let asset = new Asset({
      uuid: uuid,
      serial_number: serial_number,
      category: category,
      status: status
    });
    Asset.addAsset(asset, (err,suc) => {
      if (err){
        console.log(err);
        res.json({success: false});
      }
      else {
        console.log('Added asset!');
        res.json({success: true});
      }
    })
  }
});

router.get('/pull-assets', (req, res) => {
  Asset.pullAllAssets((err,suc) => {
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