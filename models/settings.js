const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema({
  asset_categories: [{
    uuid: String,
    value: String
  }],
  asset_statuses: [{
    uuid: String,
    value: String
  }]
});

const Settings = module.exports = mongoose.model('Settings', SettingsSchema);

module.exports.getSettings = (callback) => {
  return Settings.find(callback)[0];
}