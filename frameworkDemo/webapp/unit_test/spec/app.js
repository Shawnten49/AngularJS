'use strict'

describe('javascript', function() {
  it('should know 2 + 2 is 4', function() {
    expect(2 + 2).toEqual(4);
  });
});

describe('javascript 2', function() {
  it('should know 5 + 3 is 8', function() {
    expect(3 + 5).toEqual(5);
  });
});

describe('Basic Information 1', function() {
    
  var scope;
  var ctrl;
  var vehicleNo = "SZ9829302";

  beforeEach(module('app'));
    
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('basicInfoForm', {$scope: scope});
  }));
    
  it('Validate Vehicle Number "SZ9829302" Validate should not be "false" ', function(){
    expect(scope.validateVehicle(vehicleNo)).toEqual(false);
  });
    
});
	

