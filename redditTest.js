const snoowrap = require('snoowrap');

class RVideos extends snoowrap{
  constructor(config, uSub){
    if(process.env.NODE_ENV){
      super({
        userAgent: "Test Reddit App",
        clientId: process.env.REDDIT_CLIENT ,
        clientSecret: process.env.REDDIT_SECRET,
        username: process.env.REDDIT_USER,
        password: process.env.REDDIT_PASS
      });
    }else{
      super(require('./config.js'));
    }
    this._uSub = uSub || 'testingMishaBots'
  }

  set uSub(userSub){this._uSub = userSub;}

  getHotYTLinks(sub = 'videos') {
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
        this.postToSub(this._uSub, elem);
      });
    });
  }

  postToSub(sub, post){

    this.getSubreddit(sub).submitLink({
      title: post.title,
      url: post.url
    });
  }

}

// Change to environmental variables for remote deployment
const reddit = new RVideos(redditConfig);
reddit.getHotYTLinks('videos');
