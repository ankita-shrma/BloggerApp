blgapp.controller('searchblogcont',function($scope,$state,loginToServer,getAllPosts,getSearchedBlogs)
{            
           $scope.successMsg=false;
             $scope.errorMsg=false; 
             $scope.semail=$state.params.semail;
             var refresh=function()
           {if(loginToServer.isLoggedIn())
                    {
                    console.log("user logged in");
                    getAllPosts.getUser().then(function(data)
                                              {
                                                console.log(data.data.email);
                                                $scope.email=data.data.email;
        
                                                getSearchedBlogs.getBlogBySearchedEmail($scope.semail).then(function(data)
                                               { 
                                                  console.log(data.data);
                                                 $scope.search_user=data.data[0];
                                                 console.log($scope.search_user);
                                                 $scope.searchedEmail=$scope.search_user.email;
                                                 $scope.searchedBlogs= $scope.search_user.posts; 
                                                 $scope.firstname=$scope.search_user.userDetail.firstname;
                                                 $scope.lastname=$scope.search_user.userDetail.lastname;
                                                
                                                });
             });
          }
           }
              
           refresh();
            $scope.setLikeBtnText=function(post)
            {
              console.log(post.likes);
              if(!post.likes.some(el => el.email ===$scope.email))
              {
                console.log("like called");
                
                post.likeBtnText="Like";
              }
              else
              {
                console.log("unlike called");
                post.likeBtnText="UnLike";
              }
            }
            $scope.sendCommentToModal=function(id,email)
            {
               $scope.blogowner=email;
               $scope.blogid=id;
            }
            $scope.saveAndIncComment=function()
            {
              var commentData={};
              commentData.email=$scope.blogowner;
              commentData.myemail=$scope.email;
              commentData.comment=$scope.cmt;
              console.log(commentData);
              getAllPosts.saveAndIncCommentCount($scope.blogid,commentData).then(function(data)
                                                                 {
                                                                  if(data.data.success)
                                                                  {
                                                                    refresh();
                                                              
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
                                                            
                                                            if(data.data.success)
                                                              {
                                                                refresh();
                                                          
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
                                                           
                                                            if(data.data.success)
                                                              {
                                                                refresh();
                                                              
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