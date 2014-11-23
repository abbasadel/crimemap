angular.module('myApp', [])
.controller('ReportController', ['$scope', function($scope) {
  $scope.todos = [
  {text:'learn angular', done:true},
  {text:'build an angular app', done:false}];

  $scope.test = 'abbas ';
  alert('sss');

  $scope.questions  = {
    name: 'abbas',
    gender : {
      label: 'Are you:',
      lable_ar: '',
      options: [
        {
          label: 'A Man',
          label_ar: 'A Man',
          value: 'ذكر',
        },
        {
          label: ' A Woman ',
          label_ar: ' A Woman ',
          value: 'أنثى',
        }
      ]
    }
  };


  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}]);