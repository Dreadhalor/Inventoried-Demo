const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true
  },
  serial_number: String,
  category: String,
  status: String
});

const Asset = module.exports = mongoose.model('Asset', AssetSchema);

module.exports.getAssetByUUID = (uuid, callback) => {
  const query = {
    uuid: uuid
  };
  Asset.findOne(query, callback);
}
module.exports.getAssetBySerialNumber = (serial_number, callback) => {
  const query = {
    serial_number: serial_number
  };
  Asset.findOne(query, callback);
}
module.exports.pullAllAssets = (callback) => {
  Asset.find(callback);
}

module.exports.addAsset = (new_asset, callback) => {
  new_asset.save(callback);
}