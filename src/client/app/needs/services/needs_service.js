/*jshint multistr: true, -W117 */
(function () {
    'use strict';

    angular
        .module('app.needs')
        .factory('NeedsFactory', NeedsFactory);

    NeedsFactory.$inject = ['$http', '$q'];

    function NeedsFactory($http, $q) {
        return {
            getNeeds: function(pageNumber, itemsPerPage) {
                return $q(function (resolve, reject) {
                    $http.get('/api/needs', {
                        params: {
                            page: pageNumber > 0 ? pageNumber - 1 : 0,
                            size: itemsPerPage,
                            projection: 'inLine'
                        }
                    }).success(function (response) {
                        resolve({
                            needs: response._embedded.needs,
                            currentPage: response.page.number + 1,
                            totalItems: response.page.totalElements,
                            itemsPerPage: response.page.size
                        });
                    }).error(reject);
                });
            },
            getConcreteNeed: function(id) {
                return $http.get('/api/needs/' + id);
            },
            respondToCurrentNeed: function(data, success, error){
                $http.post('/api/needResponses', data).success(success).error(error);
            },
            checkIfNeedRespondAlreadyExists: function(id, success, error){
                $http.get('/api/needs/'+ id +'/needResponses').success(success).error(error);
            },
            cancelUserResponse: function(link, success, error) {
                $http.delete(link).success(success).error(error);
            }
        };
    }

})();
