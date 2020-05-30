 blgapp.config(function($stateProvider)
                          { 
                            $stateProvider.caseInsensitiveMatch=true;
                            
                             $stateProvider
                              .state('login',{
                                url:'',
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
                              .state('home.searchpost',{
                                     url:'/searchpost',
                              templateUrl:'/views/searchpost.html',
                             controller:'homecontroller'
            
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
                              /*resolve:{
                                       blogObject:function($stateParams)
                                        {
                                            return{
                                                
                                                   blog:$stateParams.blog
                                                }
                                        }
                                      },*/
                              templateUrl:'/views/editblog.html',
                             controller:'editblogcont'
                             
                          });
 
        });
 /*blgapp.run(function($rootScope, $state, loginToServer) {
            console.log("hi");
          $transitions.onStart({}, function(transition) {
            console.log("hi");
          });*/
           /* $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.log(loginToServer.isLoggedIn());
            if (!loginToServer.isLoggedIn()&& _.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {
                 $state.go(toState.data.redirectTo);
    }
  });*/
/*});*/
/*blgapp.run(['$rootScope','loginToServer','$state',function($rootScope,loginToServer,$state)
        { console.log("hii:");
           $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams)
           { console.log("hii:"+toState.authenticated);
            
                  
               if(toState.authenticated==true)
               {
                   if(!loginToServer.isLoggedIn())
                    {
                        event.preventDefault();
                        $state.go('login');*/
                       /* $location.path('');*/
                        
              /*      }
               }
               else if(toState.authenticated==false)
               {
                   if(loginToServer.isLoggedIn())
                    {
                        event.preventDefault();
                       $state.go('home');*/
                      /*  $location.path('/allposts');*/
                 /*   }
               }
           }); 
        }]);*/