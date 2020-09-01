 blgapp.config(function($stateProvider,$urlRouterProvider)
                          { 
                            $stateProvider.caseInsensitiveMatch=true;
                           $urlRouterProvider.otherwise('/login');
                             $stateProvider
                              .state('login',{
                                url:'/login',
                              templateUrl:'/views/login.html',
                              controller:'logincont'
                             })
                             $stateProvider
                              .state('signup',{
                                url:'/signup',
                              templateUrl:'/views/signup.html',
                              controller:'signupcont'
                          })
                             $stateProvider
                              .state('frgtpswd',{
                                url:'/frgtpswd',
                              templateUrl:'/views/frgtpswd.html',
                               controller:'frgtpswdcont'
                            
                          })
                          $stateProvider
                              .state('home',{
                                url:'/home',
                                redirectTo:'home.allposts',
                              
                              templateUrl:'/views/home.html',
                              controller:'homecontroller'
                            })
                            $stateProvider
                             .state('home.allposts',{
                              url:'/allposts',
                              templateUrl:'/views/allposts.html',
                              controller:'allblogscont'
                               
                          })
                           $stateProvider
                              .state('home.createpost',{
                               url:'/createpost',
                              templateUrl:'/views/createpost.html',
                             controller:'createblogcont'
                             
                          })
                          $stateProvider
                             .state('home.myblogs',{
                              url:'/myblogs',
                              templateUrl:'/views/myblogs.html',
                             controller:'myblogscont'
                             
                          })
                         $stateProvider
                             .state('home.editblog',{
                                     url:'/editblog',
                                   params:{
                                              blog:null
                                            },
                              templateUrl:'/views/editblog.html',
                             controller:'editblogcont'
                             
                          })
                          $stateProvider
                             .state('home.search',{
                              url:'/searchBlog',
                               params:{
                                              semail:null
                                            },
                              templateUrl:'/views/searchpost.html',
                              controller:'searchblogcont'
                               
                          });
                          
 
        });
