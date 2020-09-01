
blgapp.factory("registerToServer",function($http)
              { var registerFactory={};
               registerFactory.postSignupObject=function(user)
               {
                   return $http.post('/api/signup',user);
               };
               return registerFactory;
             });
blgapp.factory("loginToServer",function($http,loginToken)
              {
                var loginFactory={};
                loginFactory.postLoginObject=function(user)
                {
                   return $http.post('/api/login',user).then(function(data)
                                                              {
                                                                loginToken.setToken(data.data.token);
                                                                return data;
                                                              });
                };
                loginFactory.isLoggedIn=function()
                {
                  if( loginToken.getToken())
                  {
                      return true;
                  }
                  else
                  {
                      return false;
                  }
                };
                
                return loginFactory;
              });
blgapp.factory("logoutToServer",function($http,loginToken)
             {
               var logoutFactory={};
               logoutFactory.logoutUser=function()
                 {
                      loginToken.setToken();
                 };
                return logoutFactory;
             
             });
blgapp.factory("getAllPosts",function($http,loginToken)
             {
               var getAllPostsFactory={};
                 getAllPostsFactory.getUser=function()
                 {
                     if(loginToken.getToken())
                     {
                          return $http.post('/api/home');
                     }
                     else
                     {
                         $q.reject({message:'user has no token'});
                     }
                 };
                  getAllPostsFactory.getAllUser=function()
                 {
                       return $http.get('/api/all');
                 };
                getAllPostsFactory.incLikecount=function(id,likeDetails)
                {
                  return $http.put('/api/inclike/'+id,likeDetails); 
                };
                getAllPostsFactory.decLikecount=function(id,likeDetails)
                {
                  return $http.put('/api/declike/'+id,likeDetails); 
                };
                getAllPostsFactory.saveAndIncCommentCount=function(id,commentDetails)
                {
                  return $http.put('/api/saveandinccomment/'+id,commentDetails);
                };
                getAllPostsFactory.getLikesInfo=function(id)
                {
                  return $http.get('/api/likes/'+id);
                };
                getAllPostsFactory.getCommentsInfo=function(id)
                {
                  return $http.get('/api/comments/'+id);
                };
               getAllPostsFactory.getMyBlogs=function(email)
                 {
                       return $http.get('/api/my/'+email);
                 };
                getAllPostsFactory.delPost=function(id,deleteDetails)
                {
                 console.log(deleteDetails);
                 return $http.put('/api/deletepost/'+id,deleteDetails);
                };
                return getAllPostsFactory;
             
             });

blgapp.factory("loginToken",function($window)
              {
                var tokenFactory={};
                tokenFactory.setToken=function(token)
                {
                    if(token)
                    {
                        $window.localStorage.setItem('token',token);
                    }
                    else
                    {
                         $window.localStorage.removeItem('token');
                    }
                };
                tokenFactory.getToken=function()
                {
                   return $window.localStorage.getItem('token'); 
                };
                return tokenFactory;
              });

blgapp.factory("authInterceptors",function(loginToken)
             {
                var authInterceptorsFactory={};
                authInterceptorsFactory.request=function(config)
                {
                  var token=loginToken.getToken();
                  if(token)
                  {
                      config.headers['x-access-token']=token;
                  }
                    return config;
                };
                return authInterceptorsFactory;
             });
blgapp.factory("saveNewBlog",function($http)
              { var saveNewBlogFactory={};
               saveNewBlogFactory.postNewBlog=function(newblog)
               {
                   return $http.post('/api/create',newblog);
               };
               return saveNewBlogFactory;
             });
blgapp.factory("editBlog",function($http)
               { var editBlogFactory={};
                /* var retrieveBlogToEditFactory={};
                 var blogToEdit;
                 retrieveBlogToEditFactory.sendBlogToEdit=function(blog)
                 {
                     blogToEdit=blog;
                 };
                 retrieveBlogToEditFactory.getBlogToEdit=function()
                 {
                     return blogToEdit;
                 };*/
                 editBlogFactory.updateAndSaveBlog=function(id,blog)
                 {
                  return $http.put('/api/edit/'+id,blog);
                 };
                 return editBlogFactory;
               });
blgapp.factory("getSearchedBlogs",function($http)
              { var getSearchedBlogsFactory={};
               getSearchedBlogsFactory.getBlogBySearchedEmail=function(email)
               {
                return $http.get('/api/search/'+email);
               };
               return getSearchedBlogsFactory;
              } );            
