blgapp.controller('createblogcont',function($scope,$state,loginToServer,getAllPosts,saveNewBlog)
 { $scope.blog={
                            email:"",
                            title:"",
                            content:""
              };
  $scope.successMsg=false;
  $scope.errorMsg=false;
  getAllPosts.getUser().then(function(data)
                             {
                                console.log(data.data.email);
                                $scope.email=data.data.email;
                             });
    $scope.sendNewPost=function()
              {   $scope.errorMsg=false;
                  $scope.blog.email=$scope.email;
                  console.log($scope.blog);
                   saveNewBlog.postNewBlog($scope.blog).then(function(data)
                           {   
                             /*$scope.blog.title=" ";
                             $scope.blog.content=" ";*/
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