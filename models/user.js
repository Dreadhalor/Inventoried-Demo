const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

function getUserByEmail(email, callback){
  const query = {
    email: email
  };
  User.findOne(query, callback);
}

module.exports.getUserByUUID = (uuid, callback) => {
  const query = {
    uuid: uuid
  };
  User.findOne(query, callback);
}
module.exports.getUserByEmail = getUserByEmail;

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

module.exports.checkCredentials = (user_params, callback) => {
  if (user_params.email && user_params.password){
    getUserByEmail(user_params.email, (err, user) => {
      if (err){ throw err; }
      else if (user) {
        bcrypt.compare(user_params.password, user.password_hash, (err, valid) => {
          if (err){ throw err; }
          else if (valid){
            let token = jwt.sign({uuid:user.uuid},'secret');
            callback(null, token);
          }
          else return callback('Incorrect password', null);
        });
      } else return callback('Cannot find user', null);
    })
  } else return callback('Invalid credentials format', null);
};

module.exports.pullAllUsers = (callback) => {
  User.find(callback);
}