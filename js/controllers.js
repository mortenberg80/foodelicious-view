var recipeController = angular.module('recipeController', [	'ngSanitize']);

recipeController.directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model
 
        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };
 
        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize
 
        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  });

recipeController.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

recipeController.service('fileUpload', ['$http', function ($http) {
	return {
		async: function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
        	return data;
        })
        .error(function(){
        	console.log('error saving file!')
        });
	}
};
}]);

recipeController.controller('RecipeCtrl', ['$scope', '$http','$location', 'fileUpload',
	function($scope, $http, $location, fileUpload) {
		$http.get('foodelicious/recipe').
		success(function(data) {
			$scope.recipes = data;
		}).
		error(function(data) {
			// default
			$scope.recipes = [
				{'name': 'receipname1',
				'description': 'receipdescription1'},
				{'name': 'receipname2',
				'description': 'receipdescription2'},
			];
		});

		$scope.courseTypes = [
			{name:'Dessert', code:'DESSERT'},
			{name:'Drikke', code:'DRINK'},
			{name:'Forrett', code:'STARTER'},
			{name:'Gjærbakst', code:'PASTERY'},
			{name:'Kake', code:'CAKE'},
			{name:'Middag', code:'DINNER'},
			{name:'Salat', code:'SALAD'},
			{name:'Saus', code:'SAUCE'},
			{name:'Smårett', code:'SNACK'}
		];

		$scope.saveRecipe = function(recipe) {

			var file = $scope.image;
			var uploadUrl = 'foodelicious/image';

			var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data){
	        	//recipe.imageId = 'gggggg';
	        	var recipe1 = recipe;
	        	recipe1.imageId = data;
				$http.post('foodelicious/recipe', recipe1).
					success(function(data) {
						$scope.statusText = 'Recipe saved';
						$location.path('foodelicious/recipes');
					}).
					error(function(data) {
						$scope.statusText = 'Error saving';
					});
	        })
	        .error(function(){
	        	$scope.statusText = 'Error saving image';
	        });
		};
	}
]);



recipeController.controller('RecipeDetailCtrl', ['$scope', '$http', '$routeParams', 
	function($scope, $http, $routeParams) {
		$http.get('foodelicious/recipe/' + $routeParams.recipeId).
		success(function(data) {
			$scope.recipe = data;
			
		}).
		error(function(data) {
			$scope.name = 'Name not found';
		});
	}
]);
