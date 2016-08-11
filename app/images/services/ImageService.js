module.exports = function($localStorage) {
    
    
    this.setId = function(id) { $localStorage.imageId = id }
    this.id = function() { return $localStorage.imageId }
    
    this.setTitle = function(title) { $localStorage.imageTitle = title}
    this.title = function() { return $localStorage.imageTitle }  
    
    this.setUrl = function(url) { $localStorage.imageUrl = url}
    this.url = function() { return $localStorage.imageUrl }
    
    this.setStorageUrl = function(storageUrl) { $localStorage.imageStorageUrl = storageUrl}
    this.storageUrl = function() { return $localStorage.imageStorageUrl }  
    
    this.setContentType = function(contentType) { $localStorage.contentType = contentType}
    this.contentType = function() { return $localStorage.contentType }  
    
    
    this.set = function(image) {
    
        var id = image['id']
        var title = image['title']
        var url = image['url']
        var storageUrl = image['storage_url']
        var contentType = image['content_type']
        
        console.log('IMAGE = ' + JSON.stringify(image))
        console.log('IMAGE ID = ' + id)
        console.log('IMAGE TITLE = ' + title)
        console.log('IMAGE URL = ' + url)
        console.log('IMAGE STORAGE URL = ' + storageUrl)
        console.log('IMAGE CONTENT = ' + contentType)
    }
    
    this.setImageList = function(array) { 
        
        
        $localStorage.imageList = array
        var firstImage =  array[0]
        var id = firstImage['id']
        var title = firstImage['title']
        var url = firstImage['url']
        var storageUrl = firstImage['storage_url']
        var contentType = firstImage['content_type']
        
        console.log('FIRST ELEMENT = ' + JSON.stringify(firstImage))
        console.log('ID OF FIRST ELEMENT = ' + id)
        console.log('TITLE OF FIRST ELEMENT = ' + title)
        console.log('URL OF FIRST ELEMENT = ' + url)
        console.log('STORAGE URL OF FIRST ELEMENT = ' + storageUrl)
        console.log('CONTENT TYPE FIRST ELEMENT = ' + contentType)
        
        
        $localStorage.imageId = id
        $localStorage.imageUrl = url
        $localStorage.imageStorageUrl = storageUrl
        $localStorage.imageTitle = title
        $localStorage.contentType = contentType
        
    }
    
    this.imageList = function() { return $localStorage.imageList }
    
    this.count = function() { return $localStorage.imageList.length }
    
   
    this.updateScope = function(scope) {

        scope.imageId = this.id()
        scope.imageTitle = this.title()
        scope.imageUrl = this.url()
        scope.imageStorageUrl = this.storageUrl()
        scope.imageList = this.imageList()
        scope.contentType = this.contentType()
       
    }
    
       
}