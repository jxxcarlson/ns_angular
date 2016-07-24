module.exports = function($localStorage) {


 this.loginStatus = function() {
    return $localStorage.loginStatus;
  }
 
 this.username = function() {
    return $localStorage.username;
  }
 
  this.accessToken = function() {
        return $localStorage.accessToken;
  }

 
}