angular.module('pimp')
  .provider('userDataProvider', function UserDataProvider(){
    return {
      user : {
        age: "age",
        name: "name",
        gender: "gender"
      }
      }

  })
