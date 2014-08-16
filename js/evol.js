(function () {
    "use strict";

    function Configuration($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
            }).
            when('/primer', {
                templateUrl: 'partials/primer.html',
                controller: 'PrimerCtrl'
            }).
            when('/history', {
                templateUrl: 'partials/history.html'
            }).
            when('/recruitment', {
                templateUrl: 'partials/recruitment.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }

    function ISK() {
        return function (value) {
            return $.number(parseFloat(value), 2, '.', ',');
        }
    }

    function HumanifyISK() {
        return function (value) {
            var digits = value.split('.')[0];


            if(digits.length > 6 && digits.length < 10) {
                return $.number(parseFloat(value)/1000000, 2, '.', ',') + "m";
            } else if(digits.length > 10) {
                return $.number(parseFloat(value)/1000000000, 2, '.', ',') + "b";
            } else {
                // less than a million, slap on a k!
                return $.number(parseFloat(value)/1000, 2, '.', ',') + "k";
            }
        }
    }

    function SolarSystemName() {
        return function (solarSystemID) {
            return solarSystems["_"+solarSystemID];
        }
    }

/*  function RegionName() {
        return function (regionID) {
            return regions["_"+regionID];
        }
    }*/

    function ShipName() {
        return function(typeID) {
            if(typeID == '670' || typeID == '33328')
                return 'Pod';
            return ships["_"+typeID];
        }
    }

    function CorpAllianceImage() {
        return function(victim) {
            if(victim.allianceName.length > 0 ) {
                return "https://image.eveonline.com/Alliance/"+victim.allianceID+"_32.png";
            } else {
                return "https://image.eveonline.com/Corporation/"+victim.corporationID+"_32.png";
            }
        }
    }

    function DateOnly() {
        return function(datetime) {
            var date = new Date(datetime.slice(0,10));
            return date.toLocaleDateString();
        }
    }


    angular
        .module('evolApp', ['ngRoute', 'mainControllers', 'primerControllers', 'zKillboardServices'])
        .config(['$routeProvider', Configuration])
        .filter('ISK', [ISK])
        .filter('humanifyISK', [HumanifyISK])
        .filter('solarSystemName', [SolarSystemName])
//      .filter('regionName', [RegionName])
        .filter('shipName', [ShipName])
        .filter('corpAllianceImage', [CorpAllianceImage])
        .filter('dateOnly', [DateOnly]);
}());