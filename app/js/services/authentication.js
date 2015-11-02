angular.module('ccac.services')
  .factory('Authentication', ['$http', '$rootScope','Refs', '$state',
    function($http, $rootScope, Refs, $state) {
      return {
        login: function(cb) {
          Refs.root.authWithOAuthPopup("google", function(error, authData) {
            if (error) cb(authData);
            else {
              cb(authData);
            }
          });
        },

        formSignUp: function(userData, cb) {
           Refs.root.authWithPassword(userData, function(error, authData) {
            if (error) cb(authData);
            else {
              cb(authData);
            }
          });
        },

        googleSignUp: function(authData, cb) {
          if(authData.provider === 'google') {
            var user = self.buildUserObject(authData);
          }
        },

        isAuthenticated: function(cb) {
          cb(null, {});
        },

        auth: function(user) {
          $http.post('api/v1/signup',user).success(function(data) {
            $state.go('playground');
          }).error(function(error) {
            console.log('Error: ' + error);
          });
        },

        buildUserObject: function(userObject) {
          return {
            uid: authData.uid,
            name: authData.google.displayName,
            email: authData.google.email,
            access_token: authData.google.accessToken,
            first_name: authData.google.cachedUserProfile.given_name,
            known_as: authData.google.cachedUserProfile.given_name,
            last_name: authData.google.cachedUserProfile.family_name,
            picture: authData.google.cachedUserProfile.picture
          };
        }

      }
    }
  ]);