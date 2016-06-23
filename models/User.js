const mongoose = require("mongoose");

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


module.exports = exports = mongoose.model('User', UserSchema);