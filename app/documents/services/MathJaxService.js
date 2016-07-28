module.exports = function(DocumentService) {
    
    this.reload = function(message) {
        if (DocumentService.kind() == 'asciidoctor-latex') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
            console.log(message + ": reloadMathJax called"); 
        } else {
            console.log(message + ": skipping MathJax reload");
        }
        
    }
    
}