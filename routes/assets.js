const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const User = require('../models/user');

router.post('/add_asset', (req, res) => {
  let uuid = req.body.uuid;
  let serial_number = (req.body.serial_number) ? req.body.serial_number : '';
  let category_uuid = (req.body.category_uuid) ? req.body.category_uuid : 0;
  let status_uuid = (req.body.status_uuid) ? req.body.status_uuid : 0;
  if (uuid){
    let asset = new Asset({
      uuid: uuid,
      serial_number: serial_number,
      category_uuid: category_uuid,
      status_uuid: status_uuid
    });
    Asset.addAsset(asset, (err, suc) => {
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
router.post('/edit_asset', (req, res) => {
  let uuid = req.body.uuid;
  let serial_number = (req.body.serial_number) ? req.body.serial_number : '';
  let category_uuid = (req.body.category_uuid) ? req.body.category_uuid : '';
  let status_uuid = (req.body.status_uuid) ? req.body.status_uuid : '';
  if (uuid){
    Asset.getAssetByUUID(uuid, (err, asset) => {
      if (err){
        console.log(err);
        res.json({success: false});
      } else if (asset) {
        asset.serial_number = serial_number;
        asset.category_uuid = category_uuid;
        asset.status_uuid = status_uuid;
        asset.save((err, saved) => {
          if (err){
            console.log(err);
            res.json({success:false});
          } else if (saved) {
            res.json({
              success: true,
              result: saved
            });
          } else res.json({success:false});
        })
      } else res.json({success:false});
    })
  } else res.json({success:false});
});
router.post('/checkin', (req, res) => {
  let uuid = req.body.uuid;
  if (uuid){
    User.pullAllUsers((err, users) => {
      if (err) throw err;
      else if (users){
        users.forEach((user) => {
          let original_length = user.checked_out_assets.length;
          let found = user.checked_out_assets.findIndex(
            (match) => match.asset_uuid == uuid);
          while (found >= 0){
            user.checked_out_assets.splice(found,1);
            found = user.checked_out_assets.findIndex(
              (match) => match.asset_uuid == uuid);
          }
          if (user.checked_out_assets.length != original_length){
            user.save((err2, saved) => {
              if (err2) throw err2;
            })
          }
        })
        res.json({
          success: true,
          result: users
        })
      } else res.json({success:false});
    })
  } else res.json({success:false});
})

router.get('/pull_assets', (req, res) => {
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