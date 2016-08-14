angular.module('assessment').controller('mainCtrl', mainCtrl);

mainCtrl.inject = ['$location', '$rootScope', '$window', 'Notes', '$http'];

function mainCtrl($location, $rootScope, $window, Notes, $http) {
    var vm = this;

    vm.getLabels = function() {
        Notes.get({ type: 'label' }).$promise.then(function(response) {

            vm.labels = response;
        });

    }

    vm.logout = function() {

        $window.localStorage.removeItem('Token');
        $location.path('/login');
    };

    vm.createNote = function() {
        
        Notes.post({ type: 'note' }, {
            name: vm.name,
            body: vm.body
        }).$promise.then(function(response) {
            vm.getNotes();
        });
        vm.name = '';
        vm.body = '';
    };

    vm.getNotes = function() {

        //working
        Notes.get({ type: 'note' }).$promise.then(function(response) {
            vm.notes = response;
        });
    };
    vm.getNotes();
    vm.getLabels();
    
    $rootScope.$on('deleteEvent', function() {
        vm.getNotes();
    });

    $rootScope.$on('labelsEvent', function() {
        vm.getLabels();
    });
    vm.openLabelModal = function() {
        vm.labelmodel = true;
    }

    vm.labelClose = function() {
        vm.labelmodel = false;
    }

    vm.deleteLabel = function(id) {
        Notes.remove({ type: 'label', id: id });
        vm.getNotes();
        vm.getLabels();
    }

    vm.newLabel = function() {
    	
        if (vm.inputLabel.length > 0) {
            Notes.post({ type: 'label' }, {
                name: vm.inputLabel
            });
            vm.getNotes();
            vm.getLabels();
            vm.inputLabel='';
        }
    }

    vm.editLabel = function (id,name) {
    	 Notes.post({ type: 'label',id:id }, {
                name: name
            });
            vm.getNotes();
            vm.getLabels();
    }

}
