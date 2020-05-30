/*blgapp.factory("registerToServer",function($http,$q)
              {return{
                postSignupObject:function(user)
                 { var object;
                  var data={"data":user};
                  console.log(data);
                  var defered=$q.defer();
                  $http.post('/signup',data)
                  .success(function(data)
                    {object=data;
                     console.log("object is: ",object);
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                  }
                 }
           
             });
             \*/
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
blgapp.factory("retrieveBlogToEdit",function()
               {
                 var retrieveBlogToEditFactory={};
                 var blogToEdit;
                 retrieveBlogToEditFactory.sendBlogToEdit=function(blog)
                 {
                     blogToEdit=blog;
                 };
                 retrieveBlogToEditFactory.getBlogToEdit=function()
                 {
                     return blogToEdit;
                 };
                 return retrieveBlogToEditFactory;
               });
/*blgapp.factory("sendEmail",function($http,$q)
              {
                 return{
                  postEmail:function(email)
                 {var object;
                  var data={"data":email};
                  var defered=$q.defer();
                  $http.post('frgt',data)
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                 }
                 }
              });
blgapp.factory("sendNewPassword",function($http,$q)
              { return{
                  saveNewPswd:function(user)
                 {var object;
                  var data={"data":user};
                  var defered=$q.defer();
                  $http.post('newpswd',data)
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                 }
              }
              });
blgapp.factory("getData",function($http)
               {return{
                 loadData:function()
                 {var object;
                  object=$http.get('info')
                           .then(function(response)
                           {
                             object=response.data;
                           });
                  return object;
                     
                 }
               }
blgapp.factory("searchData",function($http,$q)
               {return{
                 getSearchData:function(searchemail)
                   { var object;
                  var defered=$q.defer();
                  $http.get('script/controllers/mybogjson.json')
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                  }
                 }
               });
            
blgapp.factory("saveNewPost",function($http,$q)
               {return{
                 postData:function(user)
                   { var object;
                  var data={"data":user};
                  var defered=$q.defer();
                  $http.post('login',data)
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                  }
                 }
               });
blgapp.factory("saveLikeDetail",function($http,$q)
               {return{
                 likeData:function(user)
                   { var object;
                  var data={"data":user};
                  var defered=$q.defer();
                  $http.post('login',data)
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                  }
                 }
               });
blgapp.factory("saveCommentDetail",function($http,$q)
               {return{
                 commentData:function(user)
                   { var object;
                  var data={"data":user};
                  var defered=$q.defer();
                  $http.post('login',data)
                  .success(function(data)
                    {object=data;
                     defered.resolve(object);
                    })
                 .error(function(err)
                    {defered.reject('no data found');
                      
                    });
                   return defered.promise;
                  }
                 }
               });*/