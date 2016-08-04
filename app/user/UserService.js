module.exports = function($localStorage) {
    
/*****

State variables:

    accessToken
    currentSite
    loginStatus
    signedIn
    username
    

******/
    
 this.setCurrentSite = function(site) { $localStorage.currentSite = site }
 this.getCurrentSite = function() { return $localStorage.currentSite }
 

 this.signedIn = null    

 this.signout = function() {
     
     console.log('SIGNING OUT')
     $localStorage.loginStatus = 'signedOut'
     $localStorage.username = ''
     $localStorage.accessToken = ''
     this.signedIn = null
 }  
 
 
 this.signin = function() {
     
     this.signedIn = 'yes'
 }
 
 this.loginStatus = function() {
    return $localStorage.loginStatus;
  }
 
 
 this.username = function() {
    return $localStorage.username;
  }
 
  this.accessToken = function() {
        return $localStorage.accessToken;
  }
  
  this.validateNewUser = function(username, email, password, passwordConfirmation) {
    
      // Validate username        
      var userNameIsValid = /[a-z][a-z0-9]+$/.test(username)
      
      if (!userNameIsValid) {
          
          return 'Username must be like "joe123": only lowercase letters and numbers, beginning with letter'
      }
      
      // Valid email
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var emailValid = emailRegex.test(email)
      
      if (!emailValid) {
          
          return 'Email should be like "joe123@foo.io" - username@domain'
      }
      
      // Validate password
      if ( password == undefined ) {
          
          return 'Password cannot be blank'
      }
      
      if ( password.length < 8 ) {
          
          return 'Password must have at least 8 characters'
      }
      
      if ( password.length > 16 ) {
          
          return 'Password cannot have more than 16 characters'
      }
      
      
      if (password != passwordConfirmation) {
          
          return 'Sorry, password and confirmation do not match'
      }
      
      return 'OK'
  }

 
}