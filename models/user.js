const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUUID = (uuid, callback) => {
  const query = {
    uuid: uuid
  };
  User.findOne(query, callback);
}
module.exports.getUserByEmail = (email, callback) => {
  const query = {
    email: email
  };
  User.findOne(query, callback);
}

module.exports.addUser = (user_params, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user_params.password, salt, (err, hash) => {
          let user = new User({
            uuid: user_params.uuid,
            email: user_params.email,
            first_name: user_params.first_name,
            last_name: user_params.last_name,
            password_hash: hash
          });
          console.log(user);
          user.save(callback);
      });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
  });
};