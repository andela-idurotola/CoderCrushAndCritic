angular.module('ccac.services')
  .factory('Refs', ['$firebase', '$cookies',
    function($firebase, $cookies) { 
      var rootRef = new Firebase('https://social-worker.firebaseio.com/');     
      window.rootRef = rootRef;
      return {
        root: rootRef,
        users: rootRef.child('users')
      };
    }
  ]);
