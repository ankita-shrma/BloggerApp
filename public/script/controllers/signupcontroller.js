blgapp.controller('signupcont',function($scope,registerToServer,$state){
     $scope.user={firstname:"",
                            lastname:"",
                               email:"",
                               password:"",
                              gender:""
                              };
     $scope.emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
     $scope.successMsg=false;
     $scope.errorMsg=false;
     $scope.validateAndSave=function()
                    { 
                      $scope.errorMsg=false;   
                     console.log($scope.user);
                     var pswdPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])/;
                    if($scope.user.firstname==""||$scope.user.lastname==""||$scope.user.email==""||$scope.user.password==""||$scope.cfmpswd==""||$scope.user.gender=="")
                     
                     {  console.log($scope.user);
                        /* $rootScope.message="please fill all fields";
                       $rootScope.show=true;*/
                        $scope.errorMsg="please fill all fields";
                     }
                   
                    else if(!$scope.emailPattern.test($scope.user.email))
                       {   
                            /* $rootScope.message="please write valid email id";
                       $rootScope.show=true;*/
                            $scope.errorMsg="please write valid email id";
                    }
                    
                  
                   else if(!pswdPattern.test($scope.user.password))
                       { 
                            /* $rootScope.message="password should include atleast one upppercase,one lowercase,one number and one special character";
                       $rootScope.show=true;*/
                        $scope.errorMsg="password should include atleast one upppercase,one lowercase,one number and one special character";
                    }
                    
                   else if($scope.user.password.length<8||$scope.user.password.length>20)
                    {  /*$rootScope.message="password length should be atleast 8 characters and should not exceed 20 characters";
                       $rootScope.show=true;
                           */
                        $scope.errorMsg="password length should be atleast 8 characters and should not exceed 20 characters";
                    }
                  else if($scope.user.password!=$scope.cfmpswd)
                   {/*$rootScope.message="Password do not match please re-write";
                    $rootScope.show=true;*/
                        $scope.errorMsg="Password do not match please re-write";
                   }
                    else
                    { 
                        registerToServer.postSignupObject($scope.user).then(function(data)
                            {
                              if(data.data.success)
                              {
                                  $scope.successMsg=data.data.message;
                                  $state.go('login');
                              }
                              else
                              {
                                  $scope.errorMsg=data.data.message;
                              }
                            });
                        
                        
                    }
                    }

});
