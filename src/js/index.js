var angular = require('angular');
var _ = require('underscore');

angular.module('cep', [])

.factory('CEPService', [
	'$http',
	function($http) {

		return {
			query: function(search) {
				return $http.get('/api?search=' + search);
			}
		}

	}
])

.controller('CEPController', [
	'CEPService',
	'$scope',
	function(CEP, $scope) {

		var query = _.debounce(function(search) {
			CEP.query(search).success(function(data) {
				$scope.results = data.data;
			});
		}, 200);

		$scope.$watch('search', function(search) {
			$scope.results = [];
			query(search);
		});

	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['cep']);
});