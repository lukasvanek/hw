import nconf from 'nconf';

nconf.env('__');

nconf.defaults({
  appName: require('../../package.json').name,
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-79539450-1',
  hotjarId: 328357,
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,

  remoteHotReload: false,
  sentryUrl: 'https://4eed8d6008534180a33a97d3930a5201@sentry.io/121155',
  sentryServerSideUrl: 'https://4eed8d6008534180a33a97d3930a5201:d227e89ea93045b694353663426d1ec7@sentry.io/121155',

  redisHost: 'pub-redis-12851.eu-west-1-1.1.ec2.garantiadata.com',
  redisPort: '12851',
  redisPass: 'kanecklima87',

  redisHostProd: 'snsq.dcdvht.0001.euc1.cache.amazonaws.com',
  redisPortProd: '6379',

  db: 'mongodb://server:123server789@52.29.203.172:27017/main',
});

export default nconf.get();
