module.exports = function(DocumentService) {
    
    this.reload = function(documentKind, message='**') {
        console.log('**** ***** IN MathJaxService, documentKind = ' + documentKind)
        //if (documentKind == 'asciidoc-latex') {
        if ('asciidoc-latex' == 'asciidoc-latex') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
            console.log(message + ": reloadMathJax called " + message); 
        } else {
            console.log(message + ": skipping MathJax reload " + message);
        }
        
    }
    
}