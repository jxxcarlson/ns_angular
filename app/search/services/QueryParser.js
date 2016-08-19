module.exports = function() {
    
   
    this.parse = function(query) {
        
        
        var isStandardTerm = function(str) { return (str.includes('=')) }
        var isBareTerm = function(str) { return !(str.includes('=')) }
        
        var terms = query.split(' ')
        console.log(terms.length + ' QUERY TERMS: ' + terms)
        
        var standardTerms = terms.filter(isStandardTerm)
        var bareTerms = terms.filter(isBareTerm)
    
        
        if (standardTerms == undefined) { standardTerms = [] }
        if (bareTerms == undefined) { bareTerms = [] }
        
        var standardSearchTerm = ""
        var bareSearchTerm = ""
        
        standardTerms.forEach(function(term) {standardSearchTerm += term+"&" })
        bareTerms.forEach(function(term) {bareSearchTerm += "title="+term+"&" })
        
        standardSearchTerm = standardSearchTerm.slice(0,-1)
        bareSearchTerm = bareSearchTerm.slice(0,-1)
        
        console.log('standardSearchTerm: ' + standardSearchTerm)
        console.log('bareSearchTerm: ' + bareSearchTerm)
        
        var searchText
        
        if ((standardSearchTerm == undefined) || (standardSearchTerm == '')) {
            
            searchText = bareSearchTerm
            
        } else if ((bareSearchTerm == undefined) || (bareSearchTerm == '')) {
            
            searchText = standardSearchTerm
            
        } else {
            
            searchText = bareSearchTerm + '&' + standardSearchTerm
        }
        
        console.log('PARSED QUERY: ' + searchText)
    
        return searchText
    }
    

    
    
    
    }