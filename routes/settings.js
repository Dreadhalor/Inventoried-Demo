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
    } else if (result) {
      res.json({
        success: true,
        result: result
      });
    } else res.json({success:false});
  });
});

router.post('/add_asset_category', (req, res) => {
  let uuid = req.body.uuid;
  let value = req.body.value;
  if (uuid && value){
    let category = {
      uuid: uuid,
      value: value
    };
    //console.log(category);
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        result.asset_categories.push(category);
        result.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: []
        });
        settings.asset_categories.push(category);
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});
router.post('/delete_asset_category', (req, res) => {
  let uuid = req.body.uuid;
  if (uuid){
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        let index = result.asset_categories.findIndex(
          (match) => match.uuid == uuid
        );
        if (index >= 0){
          result.asset_categories.splice(index,1);
          result.save((err,saved) => {
            if (err) res.json({success:false});
            else res.json({
              success: true,
              result: saved
            });
          });
        }
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: []
        });
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});
router.post('/set_asset_categories', (req, res) => {
  if (req.body.categories){
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        result.asset_categories = req.body.categories;
        result.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      } else {
        let settings = new Settings({
          asset_categories: req.body.categories,
          asset_statuses: []
        });
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});

router.post('/add_asset_status', (req, res) => {
  let uuid = req.body.uuid;
  let value = req.body.value;
  if (uuid && value){
    let status = {
      uuid: uuid,
      value: value
    };
    //console.log(category);
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        result.asset_statuses.push(status);
        result.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success:true,
            result: saved
          });
        });
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: []
        });
        settings.asset_statuses.push(status);
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});
router.post('/delete_asset_status', (req, res) => {
  let uuid = req.body.uuid;
  if (uuid){
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        let index = result.asset_statuses.findIndex(
          (match) => match.uuid == uuid
        );
        if (index >= 0){
          result.asset_statuses.splice(index,1);
          result.save((err,saved) => {
            if (err) res.json({success:false});
            else res.json({
              success: true,
              result: saved
            });
          });
        }
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: []
        });
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});
router.post('/set_asset_statuses', (req, res) => {
  if (req.body.statuses){
    Settings.getSettings((err,result) => {
      if (err) {
        console.log(err);
        res.json({success:false});
      } else if (result) {
        result.asset_statuses = req.body.statuses;
        result.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      } else {
        let settings = new Settings({
          asset_categories: [],
          asset_statuses: req.body.statuses
        });
        settings.save((err,saved) => {
          if (err) res.json({success:false});
          else res.json({
            success: true,
            result: saved
          });
        });
      }
    });
  }
});

module.exports = router;