const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BookingSchema = new mongoose.Schema({

  tourName: { type: String, required: true },
  priceTier: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  currency: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bookings: [BookingSchema], // Array to store multiple bookings
});

UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.remove = async function () {
  await this.model('User').deleteOne({ _id: this._id }).exec();
};

module.exports = mongoose.model('User', UserSchema);
