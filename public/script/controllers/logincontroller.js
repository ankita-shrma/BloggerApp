
blgapp.controller('logincont',function($scope,loginToServer,$state){
                 
                 $scope.user={email:"",
                               password:""};
              
                  $scope.emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                    
                     $scope.successMsg=false;
                     $scope.errorMsg=false;
                    
                    if(loginToServer.isLoggedIn())
                    {
                    console.log("user logged in");
                    }
                    else
                    {
                        console.log("user not logged in"); 
                    }
                    $scope.login=function()
                    {
                       $scope.errorMsg=false;
                      console.log($scope.user);
                      if($scope.user.email==""||$scope.user.password=="")
                      {
                          $scope.errorMsg="please fill all fields";
                      }
                      else
                       {
                           loginToServer.postLoginObject($scope.user).then(function(data)
                           {
                                if(data.data.success)
                              {
                                  $scope.successMsg=data.data.message;
                                   $state.go('home');
                              }
                              else
                              {
                                  $scope.errorMsg=data.data.message;
                              }
                           });
                    }
               
                    }
});
                