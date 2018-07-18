const express = require('express');
const router = express.Router();
const Settings = require('../models/settings');

const asset_categories = [
  '-',
  'Desktop',
  'Laptop',
  'Monitor',
  'Printer',
  'Consumable'
];
const asset_statuses = [
  '-',
  'New',
  'Assigned',
  'Returned',
  'Retired'
];


router.get('/get_settings', (req, res) => {
  Settings.getSettings((err,result) => {
    if (err) {
      console.log(err);
      res.json({success:false});
    } else {
      console.log(result);
      res.json({
        success: true,
        result: result
      });
    }
  });
});

router.post('/add_asset_category', (req, res) => {
  console.log(req.body);
  let uuid = req.body.uuid;
  let value = req.body.value;
  if (uuid && value){
    let category = {
      uuid: uuid,
      value: value
    };
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        console.log(result);
        result.asset_categories.push(category);
        result.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({success:true});
        });
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: []
        });
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({success:true});
        });
      }
    });
  }
});

module.exports = router;