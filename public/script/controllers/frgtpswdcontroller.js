blgapp.controller('frgtpswdcont',function($scope,sendEmail,$rootScope)
                  {  $scope.emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                  $scope.frgtPassword=function(email)
                  {if(email="")
                    {  $rootScope.message="please enter email id";
                       $rootScope.show=true;
                        
                    }
                   else if(!emailPattern.test(email))
                      {$rootScope.message="Please enter valid email";
                        $rootScope.show=true;
                      }
                    else
                  {var promise=sendEmail.postEmail(email);
                       promise.then(function(object)
                                    {console.log("promise object"+object);
                                      $rootScope.message="Link sent to your email id";
                                      $rootScope.show=true; 
                                    
                                     },function()
                                    {$rootScope.message="There is a error please try again";
                                      $rootScope.show=true; 
                                    });
                   }
                  }
                  }
                  );