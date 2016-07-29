angular.module('pimp')
  .factory("Gravatar", function GravatarFactory(){
    var avatarSize = 80;
    return function(email){
      return "http://gravatar.com/avatar" + CryptoJs.MD5(email) + "?size="+avatarSize.toString();

    };
  })
