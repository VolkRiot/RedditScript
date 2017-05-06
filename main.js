const RVideos = require('./src/RedditBot.js');

// Begin run logic
let env = undefined;

if (!process.env.NODE_ENV) {
  env = require('./config.js');
} else {
  env = {
    userAgent: 'Test Reddit App',
    clientId: process.env.REDDIT_CLIENT,
    clientSecret: process.env.REDDIT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS,
  };
}

const reddit = new RVideos(env, 'testingMishaBots');
reddit.getHotYTLinks('videos');