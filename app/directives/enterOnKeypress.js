
    /*
This directive allows us to pass a function in on an enter key to do what we want.
http://fiddle.jshell.net/lsconyer/bktpzgre/1/light/

That’s it.  Now just add ng-enter="myFunction()" to any element in your partial
that detects keystrokes. This has helped me a ton and added a lot of easy
functionality to an already great AngularJS system.  If you have any other
great directives or AngularJS tips please leave them below in the comments.
 */
 module.exports = function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
}