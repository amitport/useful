const mongoose = require('mongoose')
const validators = require('mongoose-validators')
const uniqueValidator = require('mongoose-beautiful-unique-validation')
const mongooseHidden = require('mongoose-hidden')()
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {type: String, hide: true},
  email: {
    type: String,
    lowercase: true,
    validate: validators.isEmail(),
    index: {unique: true, sparse: true}
  },
  avatarImageUrl: {
    type: String,
    validate: validators.isURL()
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  google: {
    type: String,
    index: {unique: true, sparse: true}
  }
})
UserSchema.plugin(uniqueValidator)
UserSchema.plugin(mongooseHidden)

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

UserSchema.post('save', function (error, doc, next) {
  console.log(error)
  next(error)
})

module.exports = mongoose.model('User', UserSchema)
