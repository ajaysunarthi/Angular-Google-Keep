angular.module('assessment').directive('noteDirective', noteDirective);

noteDirective.$inject = ['Notes'];

function noteDirective(Notes) {
    // Runs during compile
    return {

        scope: {
            note: '='
        },
        restrict: 'E',
        templateUrl: 'views/note.html',
        controller: Controller,
        controllerAs: 'vm',
        //link: link

    };

    Controller.$inject = ['$scope', '$rootScope', 'Notes'];

    function Controller($scope, $rootScope, Notes) {
        var vm = this;
        vm.note = {};
        vm.deleteNote = function(id) {

            Notes.remove({ type: 'note', id: id }).$promise.then(function() {
                $rootScope.$emit('deleteEvent')
            });
        };

        vm.addLabel = function() {
            vm.showLabelBox = true;

        };

        vm.doneLabel = function() {
            Notes.post({ type: 'label' }, {
                name: vm.labelName,
            }).$promise.then(function(response) {
            
            });
            vm.labelName="";
            $rootScope.$emit('labelsEvent')
            vm.getLabels();
        };

        vm.labelClose = function() {
            vm.showLabelBox = false;
        };

        vm.getLabels = function() {
            Notes.get({ type: 'label' }).$promise.then(function(response) {
                vm.labels = response;
            });
        }

        vm.checkbool = function(obj1, obj2) {
            for (var i = 0; i < obj2.length; i++) {
                if (obj1 == obj2[i].name) {
                    return true;
                }
            }
            return false;
        };

        vm.change = function(bool, note, label) {

            if (bool) {
                note.labels.push(label);
                Notes.post({ type: 'note', id: note.id, lbl: 'label' }, {
                    add: '' + label.id
                });
            } else {
                for (var i = 0; i < note.labels.length; i++) {
                    if (note.labels[i].id == label.id) {
                        note.labels.splice(i, 1);
                    }
                }
                Notes.post({ type: 'note', id: note.id, lbl: 'label' }, {
                    remove: '' + label.id
                });
            }
        }

        vm.colorNote = function() {
            vm.noteColor = true;
        }

        vm.closeColor = function() {
            vm.noteColor = false;
        }

        vm.changeClass = function(color) {
            vm.noteClass = color;
        }

        vm.done = function(id) {
            var name = ''+vm.note.name;
            var body = ''+vm.note.body;
            if (name !=undefined && body !=undefined ) {
                Notes.post({ type: 'note', id: id }, {
                name: name,
                body: body
            });    
            }
            
            vm.showDone = false;
        };

        vm.getLabels();
    }


}
