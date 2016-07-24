   module.exports = function() {
        this.myFunc = function (x) {
            var val = 'foobar: ' + x;
            console.log(val)
            return val;
        }
    }