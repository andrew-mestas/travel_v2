const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
        index: {
            unique: true
        }

    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    preferences: [String],
    favorites: [String],
    pastRoutes: [String]
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            username: ret.username,
            email: ret.email,
            location: ret.location
        };
        return returnJson;
    }
});

UserSchema.methods.generateHash = function(password) {
    return this.password = bcrypt.hashSync(password, 8);
};

UserSchema.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateFindHash = function(cb) {
    var tries = 0;
    var timeout;
    var _generateFindHash = () => {
        var hash = crypto.randomBytes(32);
        this.findHash = hash.toString('hex');
        this.save((err) => {
            if (err) {
                if (tries > 9) {
                    return cb(new Error('could not generate hash'));
                }
                return timeout = setTimeout(() => {
                    _generateFindHash();
                    tries++;
                }, 1000);
            }
            if (timeout) clearTimeout(timeout);
            cb(null, hash.toString('hex'));
        });
    };
    _generateFindHash();
 };

 UserSchema.methods.generateToken = function(cb) {
     this.generateFindHash(function(err, hash) {
         if (err) return cb(err);
         cb(null, jwt.sign( { idd: hash }, process.env.APP_SECRET));
     });
 };


module.exports = exports = mongoose.model('User', UserSchema);
