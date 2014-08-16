(function () {
    "use strict";

    function zKillboard($q, $http) {
        var service = {
            corpKills: [],
            shipLosses: {},
            corporationKills: function (corporationID) {
                var chill = $q.defer();
                $http.get('https://zkillboard.com/api/corporationID/'+corporationID+'/kills/api-only/no-items/no-attackers/limit/10/')
                    .then(function (result) {
                        service.corpKills= result.data;
                    chill.resolve(service.corpKills);
                }, function (failure) {
                    chill.reject(failure);
                });
                return chill.promise;
            },
            characterShipLosses: function (characterID, groupID) {
                var chill = $q.defer();
                $http.get('https://zkillboard.com/api/characterID/'+characterID+'/groupID/'+groupID+'/losses/no-items/no-attackers/api-only/limit/10/')
                    .then(function (result) {
                        service.shipLosses[characterID+'_'+groupID] = result.data;
                        chill.resolve(service.shipLosses[characterID+'_'+groupID]);
                }, function (failure) {
                        chill.reject(failure);
                });
                return chill.promise;
            }
        };
        return service;
    }

    angular
        .module('zKillboardServices', [])
        .factory('zKillboard', ['$q', '$http', zKillboard]);
}());