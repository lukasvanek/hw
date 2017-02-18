import compression from 'compression';
import express from 'express';
import render from './render';
import session from 'express-session';
import Sessions from 'express-sessions';
import config from '../config';
import redis from 'redis';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.db);
require('./Users');

const app = express();

app.use(compression());

let redisClient;
if (config.isProduction) {
  redisClient = redis.createClient(config.redisPortProd, config.redisHostProd);
} else {
  redisClient = redis.createClient(config.redisPort, config.redisHost);
  redisClient.auth(config.redisPass);
}

require('./passport')(passport);

const secret = 'what';

app.use(cookieParser(secret));

let cookieHost = '';
if (config.isProduction) cookieHost = '.sinesquare.com';

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 31536000000,
      domain: cookieHost,
    },
    store: new Sessions({
      storage: 'redis',
      instance: redisClient,
      collection: 'sessions',
      expire: 31536000000,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static('build', { maxAge: '200d' }));

app.get('*', render);

export default app;
