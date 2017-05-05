const snoowrap = require('snoowrap');

const redditConfig = require('./config.js');


class RVideos extends snoowrap{
  constructor(config){
    super(config);
  }

  getHotYTLinks(sub = 'videos', cb, ...args) {
    let links = [];
    this.getSubreddit(sub).getHot().then((entry) =>{
      entry.filter((item) => {
        try{
          return item.secure_media.oembed.provider_name === "YouTube";
        }catch(e){
          return false;
        }
      }).forEach((yLink) => {
        links.push(yLink);
      });

      links.map((elem) => {
        this.postToSub('testingMishaBots', elem);
      });
    });
  }

  postToSub(sub = 'testingMishaBots', post){
    this.getSubreddit(sub).submitLink({
      title: post.title,
      url: post.url
    });
  }

}

// Change to environmental variables for remote deployment
const reddit = new RVideos(redditConfig);

reddit.getHotYTLinks('videos', reddit.postToSub, ['testingMishaBots']);
