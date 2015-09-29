﻿/*jshint expr: true*/
describe('OffersController', function() {
    var controller, scope;
    beforeEach(function() {
        controller = undefined;
    });

    beforeEach(function() {
        module('app.core', 'app.offers');
    });

    beforeEach(function () {
        bard.inject(this, '$controller', '$rootScope', '$state');
        scope = $rootScope.$new();
        stateparams = {title: 'title', category: 'category'};
        state = $state;
        state.params = {prefilled: null};
        state.params.prefilled = {title: 'title', category: 'category'};
        controller = $controller('OffersController', {
            $scope: scope
        });
    });

    describe('Offers Controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have name', function () {
            var vm = controller;
            expect(vm.title).to.equal('OffersController');
        });

        it('should have an array with completed needs received from factory', function () {
            var vm = controller;
            expect(vm.data).to.be.an('array');
            expect(vm.data).to.not.be.empty;
        });

    });
});
