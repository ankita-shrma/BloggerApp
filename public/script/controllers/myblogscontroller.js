blgapp.controller('myblogscont',function($scope,$state,loginToServer,getAllPosts)
{
       
             $scope.successMsg=false;
             $scope.errorMsg=false;
             /* $scope.currentuser={};*/
          var reload=function()
           {if(loginToServer.isLoggedIn())
                    {
                    console.log("user logged in");
                    getAllPosts.getUser().then(function(data)
                                              {
                                                console.log(data.data.email);
                                                $scope.email=data.data.email;
                                                 getAllPosts.getMyBlogs($scope.email).then(function(data)
                                              {
                                                  console.log($scope.email);
                                                $scope.cur_user=data.data[0];
                                                console.log($scope.cur_user);
                                                $scope.myblogs= $scope.cur_user.posts; 
                                                $scope.firstname=$scope.cur_user.userDetail.firstname;
                                                $scope.lastname=$scope.cur_user.userDetail.lastname;
                                              });
                    
                    
                                               /* $scope.currentuser.email=$scope.email;
                                                 console.log($scope.currentuser);*/
                                              });
                    }
             
              }
          reload();
            $scope.goToEdit=function(post)
            {
               // retrieveBlogToEdit.sendBlogToEdit(post);
                $state.go('home.editblog',{blog:post});
                
            }
            
            $scope.deletePost=function(id,email)
            {   var delData={};
                  delData.email=email;
                 console.log(delData);
                 getAllPosts.delPost(id,delData).then(function(data)
                                                          {
                                                            reload();
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
             $scope.sendLikesInfoToModal=function(id,count)
            {
              $scope.lcount=count;
              getAllPosts.getLikesInfo(id).then(function(data)
                                        {
                                            
                                           $scope.reqLikePosts=data.data[0].posts;
                                            angular.forEach($scope.reqLikePosts,function(elem,key)
                                            {
                                              if(elem._id==id)
                                              {
                                                $scope.likes=elem.likes;
                                              }
                                            });
                                            console.log("likeinfo:"+ $scope.likes);   
                          
                                        });
            } 
            $scope.sendCommentsInfoToModal=function(id,count)
            {
              $scope.comCount=count;
              getAllPosts.getCommentsInfo(id).then(function(data)
                                        {
                                             $scope.reqPosts=data.data[0].posts;
                                            angular.forEach($scope.reqPosts,function(elem,key)
                                            {
                                              if(elem._id==id)
                                              {
                                                $scope.comments=elem.comments;
                                              }
                                            });
                                            console.log("comments info:"+$scope.comments);
                                        });
            }                  
                                                
                 
});