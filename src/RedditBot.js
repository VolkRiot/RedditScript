const snoowrap = require('snoowrap');

class RVideos extends snoowrap{
  constructor(env, uSub){
    super(env);
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

module.exports = RVideos;
