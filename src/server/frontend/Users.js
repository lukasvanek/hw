import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  user: String,
  name: String,
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    username: String,
    birthday: String,
    bio: String,
    hometown: Object,
    locale: String,
    likedArtists: Array,
  },
});

mongoose.model('users', UsersSchema);
