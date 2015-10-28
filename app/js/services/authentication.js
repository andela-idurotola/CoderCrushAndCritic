angular.module('ccac.services')
  .factory('Authentication', ['$http', '$rootScope','Refs',
    function($http, $rootScope, Refs) {
      return {
        login: function(cb) {

          Refs.root.authWithOAuthPopup("google", function(error, authData) {
            if (error) cb(authData);
            else {
              cb(authData);
            }
          });

        },

        signup: function() {

        },

        isAuthenticated: function(cb) {
          cb(null, {});
        },

        logout: function() {

        }
      }
    }
  ]);