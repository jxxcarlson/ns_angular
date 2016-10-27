module.exports = function ($scope, $rootScope, $log, $location, $state,
                           UserService, SearchService,
                           DocumentApiService, DocumentService, HotListService, PermissionService, hotkeys) {
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
            $state.go('documents')
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

    /////

}