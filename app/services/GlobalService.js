module.exports = function() {
    
    // this.clientServer = function() { return "localhost:3000" }
    // this.apiServer = function() { return "localhost:2300"}
    
    
    var configurations = {
        
        "localhost": {
            
            "clientServer": "localhost:3000",
            "apiServer": "localhost:2300",
            "serverCommand": "runh",
            "remarks": "Image upload works on host machine"
        },
        
        "jxxmbp.local": {
            
            "clientServer": "jxxmbp.local:3000",
            "apiServer": "jxxmbp.local:2300",
            "serverCommand": "runh",
            "remarks": "Image upload works on host & local machines"
        },
        
        "heroku-local": {
            
            "clientServer": "jxxmbp.local:3000",
            "apiServer": "jxxmbp.local:5000",
            "serverCommand": "heroku local",
            "remarks": "Image upload works on host & local machines"
        },
        
        "heroku&local": {
            
            "clientServer": "jxxmbp.local:3000",
            "apiServer": "sleepy-tundra-14212.herokuapp.com",
            "serverCommand": "-- api server runs remotely",
            "remarks": "Image upload fails with internal server error, Unexpected token I in JSON at positon 0"
        },
        
        "heroku&heroku": {
            
            "clientServer": "salty-savannah-99428.herokuapp.com",
            "apiServer": "sleepy-tundra-14212.herokuapp.com",
            "serverCommand": "-- api server runs remotely",
            "remarks": "Image upload fails with internal server error, Unexpected token I in JSON at positon 0"
        }
    }
    
    var configuration = "jxxmbp.local"
    
    
    this.configuration = function() { return configuration }
    this.clientServer = function() { return configurations[configuration]["clientServer"] }
    this.apiServer = function() { return configurations[configuration]["apiServer"] }
    this.serverCommand = function() { return configurations[configuration]["serverCommand"] }
    this.remarks = function() { return configurations[configuration]["remarks"] }
    
    this.defaultDocumentID = function() { return 11 }
    
}