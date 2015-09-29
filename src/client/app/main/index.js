﻿(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location', 'NeedsFactory', 'OffersFactory', '$state'];

    function IndexController($location, NeedsFactory, OffersFactory, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'IndexController';
        vm.submitCategorySearch = submitCategorySearch;
        vm.filterCategoryNeeds = filterCategoryNeeds;
        vm.filterCategoryOffers = filterCategoryOffers;
        vm.contentType = 'Потреби';
        vm.setContentType = setContentType;
        vm.offers = {};
        vm.needs = {};

        activate();

        function activate() {
            vm.needsData = NeedsFactory.getNeeds();
            vm.offersData = OffersFactory.getOffers();
        }

        function setContentType(value) {
            vm.contentType = value;
        }

        function submitCategorySearch(category, location) {
            vm.category = category;
            vm.location = location;
            // some ui validation should be applied here, tbd in future
            if (vm.contentType === 'Потреби') {
                vm.needs.category = vm.category;
                vm.needs.location = vm.location;
                $state.go('needs.home', {prefilled: vm.needs});
            } else if (vm.contentType === 'Пропозиції') {
                vm.offers.category = vm.category;
                vm.offers.location = vm.location;
                $state.go('offers.home', {prefilled: vm.offers});
            }
        }

        function filterCategoryNeeds(category) {
            vm.category = category;
            vm.needs.category = vm.category;
            $state.go('needs.home', {prefilled: vm.needs});
        }

        function filterCategoryOffers(category) {
            vm.category = category;
            vm.offers.category = vm.category;
            $state.go('offers.home', {prefilled: vm.offers});
        }
    }
})();
