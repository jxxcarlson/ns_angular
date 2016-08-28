module.exports = function() {
    
    this.reload = function(documentKind, message) {
        console.log('* MathJaxService, documentKind = ' + documentKind)
        if (documentKind == 'asciidoc-latex') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
            console.log(message + ": reloadMathJax called ");
        } else {
            console.log(message + ": skipping MathJax reload ");
        }
        
    }
    
}