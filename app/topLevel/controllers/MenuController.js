module.exports = function ($scope, $rootScope, $log, $location, $state, $window,
                           UserService, SearchService,
                           DocumentApiService, DocumentService, HotListService, PermissionService, hotkeys, MailService) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));


    $scope.hotList = function() {

        HotListService.hotList($scope)
    }

    $scope.showDocumentSource = function() {

        console.log('showDocumentSource clicked')
        var path = 'documents/' + DocumentService.currentDocumentItem().id + '?show_source=yes'
        var idAndQuery =  DocumentService.currentDocumentItem().id + '?show_source=yes'
        console.log('path = ' + path)
        console.log('idAndQuery = ' + idAndQuery)
        $location.path(path)
        $state.go('documents', {id: idAndQuery})

    }


    $scope.userDocuments = function () {
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('user=' + UserService.username(), $scope, 'documents')
    }

    $scope.allDocuments = function () {
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('scope=all', $scope, 'documents')
    }

    $scope.getRandomDocuments = function () {
        console.log('TOCTITLE, randomDocuments')
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('random=50', $scope, 'documents')
    }

    $scope.home = function () {
        console.log('GO HOME')
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('user.title=' + UserService.username() + '.home', $scope, 'documents')
    }


    $scope.shareDocument = function () {

        MailService.shareCurrentDocument()

    }

    $scope.showSource = function() {

        var id = DocumentService.currentDocumentItem().id
        var path = 'documents/' + id + '?option=showsource'
        console.log('MenuController, showSource; path = ' + path)
        $location.path(path)
        var obj = {id: id + '?option=showsource'}
        $state.go('.showSource')

    }

    $scope.getImages = function () {
        console.log('Get Images')
        SearchService.query('random=50', $scope, 'documents')
    }

    $scope.publicDocuments = function () {
        DocumentService.setTocTitlePreferred('Search results')
        DocumentService.setUseHotList(false, $scope)
        SearchService.query('scope=public', $scope, 'documents')
    }


    $scope.doEditDocument = function () {

        if (PermissionService.canEdit()) {
            $state.go('editdocument')
        }

    }

    $scope.getUserManual = function() {

        SearchService.query('id=227', $scope, 'documents')
    }

    $scope.getAsciidocGuide = function() {

        // SearchService.query('id=152', $scope, 'documents')
        $state.go('documents', {id: '152', option: 'toc'}, {reload: true})
    }

    /////
    //$scope.$on('someEvent', function(event, data) { console.log('WWW' + data); });

    // You can pass it an object.  This hotkey will not be unbound unless manually removed
    // using the hotkeys.del() method
    hotkeys.add({
        combo: 'ctrl+e',
        description: 'Edit document',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {

            if (PermissionService.canEdit()) {
                $state.go('editdocument')
            }
        }
    });



    hotkeys.add({
        combo: 'ctrl+b',
        description: 'Go to blog',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {

            //$window.location.href = 'http://manuscriptablog.org';
            $window.open('https://manuscriptablog.org', '_blank')
        }
    });



    hotkeys.add({
        combo: 'ctrl+n',
        description: 'New document',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {

            if (PermissionService.canEdit()) {
                $state.go('newdocument')
            }
        }
    });

    hotkeys.add({
        combo: 'ctrl+l',
        description: 'Hot list',
        // allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('toggle hot lists ...')
            $scope.hotList()
            // $state.go('documents')
        }
    });

    hotkeys.add({
        combo: 'ctrl+i',
        description: 'Images',
        // allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('Go to images ...')
            $state.go('images')
        }
    });

    hotkeys.add({
        combo: 'ctrl+j',
        description: 'Images',
        // allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('Go to images ...')
            $state.go('imageupload')
        }
    });

    hotkeys.add({
        combo: 'ctrl+p',
        description: 'Print document',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('PRINT DOCUMENTs ...')
            DocumentApiService.printDocument($scope, DocumentService.currentDocumentItem().id, {})
            $state.go('printdocument')
        }
    });


    hotkeys.add({
        combo: 'ctrl+u',
        description: 'User documents',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('USER DOCUMENTs ...')
            SearchService.query('user=' + UserService.username(), $scope)
        }
    });

    hotkeys.add({
        combo: 'ctrl+y',
        description: 'Public documents',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('USER DOCUMENTs ...')
            SearchService.query('scope=public', $scope, 'documents')
        }
    });

    hotkeys.add({
        combo: 'ctrl+v',
        description: 'View docuemnt',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            var id = DocumentService.currentDocumentItem().id
            $location.path('/documents/' + DocumentService.currentDocumentItem().id + '?option=none')
            $state.go('documents', {id: id, option: 'none'}, {reload: true})
        }
    });

    hotkeys.add({
        combo: 'ctrl+t',
        description: 'Export to Latex',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('LATEX EXPORT')
            $state.go('exportlatex')
        }
    });

    hotkeys.add({
        combo: 'ctrl+g',
        description: 'Goto signin page',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            $state.go('signin')
        }
    });

    hotkeys.add({
        combo: 'ctrl+h',
        description: 'Goto home page',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('Go to ' + UserService.username() + '.home')
            SearchService.query('user.title=' + UserService.username() + '.home', $scope, 'documents')
        }
    });

    hotkeys.add({
        combo: 'ctrl+s',
        description: 'Share document',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('SHARE CURRENT DOCUMENT')
            MailService.shareCurrentDocument()
        }
    });

    /**
    hotkeys.add({
        combo: 'ctrl+s',
        description: 'Show source',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('SHARE CURRENT DOCUMENT')
           showSource()
        }
    });
     **/

    hotkeys.add({
        combo: 'ctrl+r',
        description: 'Random documents',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            console.log('GET RANDOM DOCUMENTS')
            DocumentService.setTocTitlePreferred('Search results')
            DocumentService.setUseHotList(false, $scope)
            SearchService.query('random=10', $scope, 'documents')
        }
    });

    hotkeys.add({
        combo: 'ctrl+m',
        description: 'User Manual',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            DocumentService.setTocTitlePreferred('Search results')
            DocumentService.setUseHotList(false, $scope)
            $scope.getUserManual()
        }
    });

    hotkeys.add({
        combo: 'ctrl+a',
        description: 'Asciidoc Guide',
        allowIn: ['INPUT', 'TEXTAREA'],
        callback: function () {
            DocumentService.setTocTitlePreferred('Search results')
            DocumentService.setUseHotList(false, $scope)
            $scope.getAsciidocGuide()
        }
    });

    /////

}