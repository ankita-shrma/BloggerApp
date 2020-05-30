blgapp.controller('editblogcont',function($scope,$state)
{   
    console.log($state.params.blog);
    /*$scope.blog=blogObject.blog*/
    $scope.blog=$state.params.blog;
  /*$scope.blog=retrieveBlogToEdit.getBlogToEdit();*/
});