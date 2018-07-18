const express = require('express');
const router = express.Router();

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
const routes = {
  add_asset: 'assets/add-asset'
}


router.get('/', (req, res) => {
  res.json({
    asset_categories: asset_categories,
    asset_statuses: asset_statuses,
    routes: routes
  });
});

module.exports = router;