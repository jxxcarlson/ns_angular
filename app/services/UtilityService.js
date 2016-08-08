module.exports = function(Math) {
     
    this.reportTime = function() {
        
        var dt = new Date()
        var tt = dt.getTime()
        var sec = Math.trunc(tt/1000.0) % 1000
        var ms = tt % 1000
        
        return sec + "::" + ms
    }
}