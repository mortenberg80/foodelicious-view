var recipeApp = angular.module('recipeApp', [
	'ngRoute',
	'ngSanitize',
	'recipeController'
]);

recipeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/recipes', {
				templateUrl: 'views/partials/recipe_overview.html',
				controller: 'RecipeCtrl'
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'views/partials/recipe_detail.html',
				controller: 'RecipeDetailCtrl'
			})
			.when('/shoppinglist', {
                templateUrl: 'views/partials/shoppinglist_new.html'
            })
            .when('/shoppinglistAdd', {
                templateUrl: 'views/partials/shoppinglist_add_recipe.html'
            })
            .when('/shoppinglistOverview', {
                templateUrl: 'views/partials/shoppinglist_overview.html'
            })
			.when('/new', {
				templateUrl: 'views/partials/recipe_new.html'
			})
			.otherwise({
				redirectTo: '/recipes'
			});
	}]);