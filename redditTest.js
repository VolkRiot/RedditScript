let snoowrap = require('snoowrap');
const redditConfig = require('./config.js');

const reddit = new snoowrap(redditConfig);

let videosHot = reddit.getSubreddit('videos').getHot().then(console.log);
//.getHot().then(console.log); //.map(post => post.title).then(console.log);
