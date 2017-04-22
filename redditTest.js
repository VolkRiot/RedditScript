let snoowrap = require('snoowrap');
const redditConfig = require('./config.js');


console.log(redditConfig);
const reddit = new snoowrap(redditConfig);

