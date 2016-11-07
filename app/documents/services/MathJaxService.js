module.exports = function() {
    
    this.reload = function(documentKind, message) {

        console.log('* MathJaxService, documentKind = ' + documentKind)
        if (documentKind == 'asciidoc-latex') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
            console.log(message + " 1: reloadMathJax called ");
        } else {
            console.log(message + " 1: skipping MathJax reload ");
        }

    }

    this.reload2 = function(documentKind, message) {
        console.log('* MathJaxService, documentKind = ' + documentKind)
        if (documentKind == 'asciidoc-latex' || true ) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            console.log(message + " 2. reloadMathJax called ");
        } else {
            console.log(message + " 2. skipping MathJax reload ");
        }

    }
    
}