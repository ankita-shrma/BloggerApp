blgapp.controller('newpasswordcont',function($scope,$rootScope,sendNewPassword,$state)
                 { $scope.user2={email:"",
                                 password:""};
                  $scope.emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                  $scope.pswdPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])/;
                   $scope.savePassword=function(user2)
                   {  if(user2.email=""||user2.password=""||cnfmnewpswd="")
                       { $rootScope.message="please fill all fields";
                           $rootScope.show=true;
                           
                       }
                       else if(!emailPattern.test(user2.email))
                      {$rootScope.message="Please enter valid email";
                        $rootScope.show=true;
                      }
                      else if(!pswdPattern.test(user2.password))
                       { 
                             $rootScope.message="password should include atleast one upppercase,one lowercase,one number and one special character";
                       $rootScope.show=true;
                
                    }
                    
                   else if(user2.password.length<8||user2.password.length>20)
                    {  $rootScope.message="password length should be atleast 8 characters and should not exceed 20 characters";
                       $rootScope.show=true;
                           
                        
                    }
                  else if(user2.password!=$scope.cnfmnewpswd)
                   {$rootScope.message="Password do not match please re-write";
                    $rootScope.show=true;
                   }
                  else
                    { var promise=sendNewPassword.saveNewPswd(user2);
                       promise.then(function(object)
                                    {console.log("promise object"+object);
                                      $rootScope.message="password reset successfully";
                                      $rootScope.show=true; 
                                      $state.go("login");
                                     },function()
                                    {$rootScope.message="unsuccessfull please enter details again";
                                      $rootScope.show=true; 
                                    }
                                   );
                        
                    }
                   }
    
                });