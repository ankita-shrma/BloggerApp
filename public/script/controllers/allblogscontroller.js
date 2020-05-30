blgapp.controller('allblogscont',function($scope,$state,getAllPosts)
           { 
              
             $scope.successMsg=false;
             $scope.errorMsg=false;
                
                var refresh=function()
                {                               
                      getAllPosts.getAllUser().then(function(data)
                                              {
                                                console.log(data.data);
                                                $scope.users=data.data;
                                              
                                              });
                 }
              refresh();
   
                   
            $scope.incLike=function(id,email,likes)
            {    var likeData={};
                 likeData.email=email;
                 likeData.myemail=$scope.email;
                console.log(likeData);
               // console.log(likes.some(el => el.email ===likeData.myemail ));
                 if(!likes.some(el => el.email ===likeData.myemail ))
                 {
               /*   $scope.class="likecolor";*/
                 getAllPosts.incLikecount(id,likeData).then(function(data)
                                                          {
                                                            refresh();
                                                            if(data.data.success)
                                                              {
                                                               $scope.successMsg=data.data.message;
                                                              /* $scope.mystyle={'background-color':'white'};*/
                                                              }
                                                             else
                                                               {
                                                                $scope.errorMsg=data.data.message;
                                                              /*  $scope.mystyle={'background-color':'crimson'};  */
                                                               }
                                                           });
                 }
               else
               {
                /* $scope.class="dislikecolor";*/
                console.log("already present");
                getAllPosts.decLikecount(id,likeData).then(function(data)
                                                          {
                                                            refresh();
                                                            if(data.data.success)
                                                              {
                                                               $scope.successMsg=data.data.message;
                                                              /* $scope.mystyle={'background-color':'crimson'}; */ 
                                                              }
                                                             else
                                                               {
                                                                $scope.errorMsg=data.data.message;
                                                               /* $scope.mystyle={'background-color':'white'};*/
                                                               }
                                                           });
                
                
               }
            }
           
                    
                    
    
});