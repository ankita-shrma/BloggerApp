var blgapp=angular.module('blogapp',['ui.router'])
.config(function($httpProvider)
       {
        $httpProvider.interceptors.push('authInterceptors');
        });
       