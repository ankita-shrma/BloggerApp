
blgapp.controller('logincont',function($scope,loginToServer,$state){
                 
                 $scope.user={email:"",
                               password:""};
                /*   $scope.token;*/
                  /* $rootScope.show=false;*/
                /*  $scope.user={};*/
                  $scope.emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                     /*$rootScope.message;
*/
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
                /*    { 
                     console.log($scope.user1);
                     if($scope.user.email==""||$scope.user.password=="")
                     {$rootScope.message="please fill all fields";
                       $rootScope.show=true;
                       
                     }
                     else if(!$scope.emailPattern.test(user.email))
                       { 
                             $rootScope.message="please write valid email id";
                             $rootScope.show=true;
                           
                    }
                    
                      else
                      {   $rootScope.email=user.email;
                           user1.token=$scope.token;
                          console.log($rootScope.email);
                          var promise=loginToServer.postLoginObject(user1);
                       promise.then(function(object)
                                    {console.log("promise object"+object);
                                      $rootScope.message="Successfully login";
                                      $rootScope.show=true; 
                                      
                                      $state.go("home");
                                     },function()
                                    { $rootScope.message="Login unsuccessfull please enter correct details";
                                         $rootScope.show=true; 
                                    });
                    }
                    }*/
                    }
});
                