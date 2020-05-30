blgapp.controller('homecontroller',function($scope,$state,logoutToServer,loginToServer,getAllPosts,saveNewBlog)
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
                     /* getAllPosts.getUser().then(function(data)
                                              {
                                                console.log(data.data);
                                                $scope.users=data.data.users;
                                              });*/
                    /* $http.get('/contactlist').success(function(response)
                                               {
                          console.log("i get the data");
                      $scope.contactlist=response;
                      $scope.contact="";*/
                   
                   
                   
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
         
           /* $scope.getUserData=function()
            { 
              $scope.user=getData.loadData();
              
            }*/
          /*  var myemail=$rootScope.email;*/
            /* $scope.user={};
        
            $scope.postDetail={};
            $scope.likeDetail={};
          $scope.commentDetail={};
        
            $scope.sendNewPost=function(uploadPost)
            {
               $scope.postDetail.uploadPost=uploadPost;
                $scope.postDetail.email=myemail;
                console.log($scope.postDetail);
                var promise=saveNewPost.postData($scope.postDetail);
                       promise.then(function(object)
                                    {console.log("promise object"+object);
                                      $rootScope.message="post created successfully";
                                      $rootScope.show=true; 
                                      $state.go("home.allposts");
                                     });
            }*/
          /*     console.log(myemail);
            $scope.eemail=myemail;*/
        
          /*  $scope.search=function(searchemail)
            {  console.log(myemail);
                console.log(searchemail);
                var promise=searchData.getSearchData(searchemail);
                       promise.then(function(object)
                                    {console.log("promise object"+JSON.stringify(object));
                                     
                                    $rootScope.searchposts=object.dat[0].posts;
                                     $rootScope.semail=object.dat[0].email;
                                    console.log($rootScope.searchposts);
                                      $state.go("home.searchpost");
                                  });
        
                
            }
            $scope.sendLikeDetails=function(email,likecount,semail,id,index)
            {console.log(email);
             console.log(likecount);
             console.log(semail);
             console.log(id);
           
             $scope.likeDetail.email=email;
               $scope.likeDetail.likecount=likecount;
                 $scope.likeDetail.semail=semail;
                 $scope.likeDetail.id=id;
             console.log($scope.likeDetail);
               var promise=saveLikeDetail.likeData($scope.likeDetail);
                            promise.then(function(object)
                                         {  ++$rootScope.searchposts[index].likeCount;
                                          });
            }
              $scope.sendCommentDetails=function(email,comment,index,semail,id)
            {console.log(email);
             console.log(comment);
             console.log(semail);
             console.log(id);
        
            
             $scope.commentDetail.email=email;
               $scope.commentDetail.comment=comment;
                 $scope.commentDetail.semail=semail;
                 $scope.commentDetail.id=id;
             console.log($scope.commentDetail);
        
               var promise=saveCommentDetail.commentData($scope.commentDetail);
                            promise.then(function(object)
                                         { $rootScope.searchposts[index].comments.push({email:email,content:comment});
                                          });
          
            }*/
           });