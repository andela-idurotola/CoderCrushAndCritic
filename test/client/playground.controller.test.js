describe('playground Controller Tests',function() {
  var scope, ctrl, rootScope;
  beforeEach(module('CCAC'));
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    scope     = $rootScope.$new();
    rootScope = $rootScope;
    ctrl      = $controller('PlaygroundCtrl', {$scope: scope});
  }));

  it('should test that the playground controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('should test that the scope in playground controller exist', function() {
    expect(scope).toBeDefined();
  });
});