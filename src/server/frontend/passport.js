import mongoose from 'mongoose';
const Users = mongoose.model('users');

export default function PassportMiddleware(passport) {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    Users.findById(id).exec((err, user) => done(err, user));
  });
}
