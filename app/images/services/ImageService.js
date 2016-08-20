module.exports = function($localStorage) {
    
    
    this.setImageId = function(id) { $localStorage.imageId = id }
    this.imageId = function() { return $localStorage.imageId }
    
    this.setTitle = function(title) { $localStorage.imageTitle = title}
    this.title = function() { return $localStorage.imageTitle }  
    
    this.setUrl = function(url) { $localStorage.imageUrl = url}
    this.setUrl = function(url) { $localStorage.imageUrl = url}
    this.url = function() { return $localStorage.imageUrl }
    
    this.setStorageUrl = function(storageUrl) { $localStorage.imageStorageUrl = storageUrl}
    this.storageUrl = function() { return $localStorage.imageStorageUrl }

    this.setImageSource = function(source) { $localStorage.imageSource = source}
    this.imageSource = function() { return $localStorage.imageSource }

    this.setContentType = function(contentType) { $localStorage.contentType = contentType}
    this.contentType = function() { return $localStorage.contentType }

    // this.setTags = function(tags) { $localStorage.tags = tags}
    this.tags = function() { return $localStorage.tags }
    this.setTags = function(tags) { $localStorage.tags = tags }


    this.set = function(image) {
    
        var id = image['id']
        var title = image['title']
        var url = image['url']
        var storageUrl = image['storage_url']
        var source = image['source']
        var contentType = image['content_type']
        var tags = image['tags']

        $localStorage.imageId = id
        $localStorage.imageUrl = url
        $localStorage.imageStorageUrl = storageUrl
        $localStorage.imageTitle = title
        // $localStorage.source = source
        this.setImageSource(source)
        $localStorage.contentType = contentType
        $localStorage.tags = tags

        console.log('=================================')
        console.log('PACKET (IMAGE SERVICE SET):')
        console.log('===========================')
        console.log('IMAGE = ' + JSON.stringify(image))
        console.log('IMAGE ID = ' + id)
        console.log('IMAGE TITLE = ' + title)
        console.log('IMAGE URL = ' + url)
        console.log('IMAGE STORAGE URL = ' + storageUrl)
        console.log('IMAGE SOURCE = ' + source)
        console.log('IMAGE CONTENT = ' + contentType)
        console.log('IMAGE TAGS= ' + tags)
        console.log('=================================')
    }
    
    this.setImageList = function(array) { 
        
        
        $localStorage.imageList = array
        var firstImage =  array[0]
        var id = firstImage['id']
        this.setImageId(firstImage['id'])
        var title = firstImage['title']
        var url = firstImage['url']
        var storageUrl = firstImage['storage_url']
        var source = firstImage['source']
        var contentType = firstImage['content_type']
        var tags = firstImage['tags']

        console.log('SIL: FIRST ELEMENT = ' + JSON.stringify(firstImage))
        console.log('SIL: ID OF FIRST ELEMENT = ' + id)
        console.log('SIL: TITLE OF FIRST ELEMENT = ' + title)
        console.log('SIL: URL OF FIRST ELEMENT = ' + url)
        console.log('SIL: SOURCE FIRST ELEMENT = ' + source)
        console.log('SIL: CONTENT TYPE FIRST ELEMENT = ' + contentType)
        console.log('SIL: TAGS FIRST ELEMENT = ' + tags)

        
        $localStorage.imageId = id
        $localStorage.imageUrl = url
        $localStorage.imageStorageUrl = storageUrl
        $localStorage.imageTitle = title
        $localStorage.imageSource = source
        $localStorage.contentType = contentType
        $localStorage.tags = tags

    }
    
    this.imageList = function() { return $localStorage.imageList }
    
    this.count = function() { return $localStorage.imageList.length }
    
   
    this.updateScope = function(scope) {

        scope.imageId = this.imageId()
        scope.imageTitle = this.title()
        scope.imageUrl = this.url()
        scope.imageStorageUrl = this.storageUrl()
        scope.imageList = this.imageList()
        scope.source = this.imageSource()
        scope.contentType = this.contentType()
        scope.tags = this.tags()

    }
    
       
}