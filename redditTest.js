let snoowrap = require('snoowrap');
const redditConfig = require('./config.js');

const reddit = new snoowrap(redditConfig);

reddit.getSubreddit('videos');
//.getHot().then(console.log); //.map(post => post.title).then(console.log);

reddit.

