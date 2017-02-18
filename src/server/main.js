import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import raven from 'raven';
import fs from 'fs';

const sentryClient = new raven.Client(config.isProduction && config.sentryServerSideUrl);
if (config.isProduction) {
  sentryClient.patchGlobal(() => {
    console.log('Bye, bye, world.');
    process.exit(1);
  });
}

const app = express();

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(fs.readFileSync(`${__dirname}/robots.txt`));
});

app.get('/sitemap.txt', (req, res) => {
  res.type('text/plain');
  res.send(fs.readFileSync(`${__dirname}/sitemap.txt`));
});

app.get('/api/images', (req, res) => {
  const images = [
    {
      _id: 1,
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg',
    },
    {
      _id: 2,
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg',
    },
    {
      _id: 3,
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg',
    },
    {
      _id: 4,
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg10.jpg',
    }
  ];
  res.json(images);
});

app.use(frontend);
app.use(errorHandler);


if (config.isProduction) app.use(raven.middleware.express(config.sentryServerSideUrl));

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
