(function () {
    "use strict";

    function MainCtrl($scope, zKillboard) {
        $scope.recentKills = [];
        $scope.tarLosses = [];
        $scope.errors = [];

        zKillboard.corporationKills(144749962).then(function (kills) {
            $scope.recentKills = kills;
        }, function (failed) {
            console.log(failed);
            $scope.errors.push('Failed to load zKillboard');
        });
        zKillboard.characterShipLosses(1874984094, 831).then(function (losses) {
            $scope.tarLosses = losses;
        }, function (failed) {
            console.log(failed);
            $scope.errors.push('Failed to load Pax Amarria');
        })
    }

    function PrimerCtrl($scope) {
        $scope.currentPage = 1;

        $scope.changePage = function (pageNumber, $event) {
            $scope.currentPage = pageNumber;
            $("button.btn").removeClass("active");
            $($event.target).addClass("active");
        }
    }

    angular
        .module('mainControllers', [])
        .controller('MainCtrl', ['$scope', 'zKillboard', MainCtrl]);
    angular
        .module('primerControllers', [])
        .controller('PrimerCtrl', ['$scope', PrimerCtrl]);

}());