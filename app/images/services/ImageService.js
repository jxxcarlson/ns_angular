module.exports = function($localStorage) {
    
    
    this.setId = function(id) { $localStorage.imageId = id }
    this.id = function() { return $localStorage.imageId }
    
    this.setTitle = function(title) { $localStorage.imageTitle = title}
    this.title = function() { return $localStorage.imageTitle }  
    
    this.setUrl = function(url) { $localStorage.imageUrl = url}
    this.url = function() { return $localStorage.imageUrl }
    
    this.setStorageUrl = function(storageUrl) { $localStorage.imageStorageUrl = storageUrl}
    this.storageUrl = function() { return $localStorage.imageStorageUrl }  
    
    
    this.setImageList = function(array) { 
        
        
        $localStorage.imageList = array
        var firstImage =  array[0]
        var id = firstImage['id']
        var title = firstImage['title']
        var url = firstImage['url']
        var storageUrl = firstImage['storage_url']
        
        console.log('FIRST ELEMENT = ' + JSON.stringify(firstImage))
        console.log('ID OF FIRST ELEMENT = ' + id)
        console.log('TITLE OF FIRST ELEMENT = ' + title)
        console.log('URL OF FIRST ELEMENT = ' + url)
        console.log('STORAGE URL OF FIRST ELEMENT = ' + storageUrl)
        
        
        $localStorage.imageId = id
        $localStorage.imageUrl = url
        $localStorage.imageStorageUrl = storageUrl
        $localStorage.title = title
        
    }
    
    this.imageList = function() { return $localStorage.imageList }
    
    this.count = function() { return $localStorage.imageList.length }
    
   
    this.updateScope = function(scope) {

        scope.imageId = this.id()
        scope.imageTitle = this.title()
        scope.imageUrl = this.url()
        scope.imageStorageUrl = this.storageUrl()
        scope.imageList = this.imageList()
       
    }
    
       
}