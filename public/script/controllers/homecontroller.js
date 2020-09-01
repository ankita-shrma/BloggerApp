blgapp.controller('homecontroller',function($scope,$state,logoutToServer,loginToServer,getAllPosts)
           { 
              
             $scope.successMsg=false;
             $scope.errorMsg=false;
               
                 if(loginToServer.isLoggedIn())
                    {
                    console.log("user logged in");
                    getAllPosts.getUser().then(function(data)
                                              {
                                                console.log(data.data.email);
                                                $scope.email=data.data.email;
                                              }); 
                   
                    }
                    else
                    {
                        console.log("user not logged in"); 
                    }
                 
             $scope.logout=function()
             {
                  logoutToServer.logoutUser();
                  $state.go('login');
             }
           
           });