module.exports = function() {
    
   
    this.parse = function(query) {
        
        
        var isPureTerm = function(str) { return !(str.includes('.')) }
        var isMixedTerm = function(str) { return str.includes('.') }
        
        var terms = query.split(' ')
        console.log(terms.length + ' QUERY TERMS: ' + terms)
        
        var pureTerms = terms.filter(isPureTerm)
        var mixedTerms = terms.filter(isMixedTerm)
        
        if (pureTerms == undefined) { pureTerms = [] }
        if (mixedTerms == undefined) { mixedTerms = [] }
        
        var titleSearchTerm = ""
        var scopeSearchTerm = ""
        pureTerms.forEach(function(term) {titleSearchTerm += "title="+term+"&" })
        mixedTerms.forEach(function(term) {scopeSearchTerm += "scope="+term+"&" })
        
        titleSearchTerm = titleSearchTerm.slice(0,-1)
        scopeSearchTerm = scopeSearchTerm.slice(0,-1)
        
        var searchText
        
        if ((titleSearchTerm == undefined) || (titleSearchTerm == '')) {
            
            searchText = scopeSearchTerm
            
        } else if ((scopeSearchTerm == undefined) || (scopeSearchTerm == '')) {
            
            searchText = titleSearchTerm
            
        } else {
            
            searchText = scopeSearchTerm + '&' + titleSearchTerm
        }
    
        return searchText
    }
    

    
    
    
    }