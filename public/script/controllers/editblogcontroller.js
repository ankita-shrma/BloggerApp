blgapp.controller('editblogcont',function($scope,$state,editBlog)
{   
    console.log($state.params.blog);
    $scope.blog=$state.params.blog;
    $scope.updateBlog=function(blog)
    {
      $scope.id=blog._id;
      editBlog.updateAndSaveBlog($scope.id,blog).then(function(data)
                                               {
                                                if(data.data.success)
                                                {
                                            
                                                 $scope.successMsg=data.data.message;
                                                
                                                }
                                               else
                                                 {
                                                  $scope.errorMsg=data.data.message;
                                                 }
                                               });
                                              
    }
});