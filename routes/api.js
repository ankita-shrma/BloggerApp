var blogmodel=require('../models/blogmodel');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var secret='girlcoder';
module.exports=function(router)
{
    router.post('/signup',function(req,res)
    {
                console.log(req.body);
                var newUser= new blogmodel();
                newUser.email=req.body.email;
                newUser.password=req.body.password;
                newUser.userDetail.firstname=req.body.firstname;
                newUser.userDetail.lastname=req.body.lastname;
                 newUser.userDetail.gender=req.body.gender;
               if(req.body.firstname==""||req.body.lastname==""||req.body.email==""||req.body.password==""||req.body.gender=="")
               {
                 res.json({success:false,message:'ensure firstname,lastname,email,password and gender were provided'});
               }
               else
               { newUser.save(function(err)
                             { if(err)
                                res.json({success:false,message:'email or password already exist'});
                               else
                                res.json({success:true,message:'user created'});
                              });
               }
             });
    router.post('/login',function(req,res)
   { 
        blogmodel.findOne({email:req.body.email}).select('email password').exec(function(err,user)
        {
           var validPassword;
            if(err) throw err;
             console.log(user);
            if(!user)
            {
                res.json({success:false,message:'invalid email'});
            }
            else if(user)
                 {
                     if(req.body.password)
                     {     console.log(req.body.password);
                           console.log(user.password);
                       /* bcrypt.compare(req.body.password,user.password,function(err,res) {
                         validPassword=res;
                        });*/
                        /*var validPassword=bcrypt.compareSync(req.body.password,user.password);
                    */
                       /* var validPassword=user.confirmPassword(req.body.password);
                         console.log(validPassword);*/
                        bcrypt.compare(req.body.password,user.password,function(err,result){
                            console.log(err);
                            console.log("first"+result);
                         validPassword=result;
                         console.log(validPassword);
                    
                       console.log(validPassword);
                     if(!validPassword)
                     {
                         res.json({success:false,message:'invalid password'});
                     }
                     else
                     {
                       var token=jwt.sign({email:user.email},secret,{expiresIn:'24h'});
                       res.json({success:true,message:'successful login',token:token});  
                     }
                      }); 
                     }
                     else
                     {
                         res.json({success:false,message:'password not provided'});
                     }

                    
                 }
        });
    });
    router.use(function(req,res,next)
    {
        var token=req.body.token||req.body.query||req.headers['x-access-token'];
        if(token)
        {
          jwt.verify(token,secret,function(err,decoded)
                    {
                      if(err)
                      {
                          res.json({success:false,message:'Token Invalid'});
                      }
                      else
                      {
                         req.decoded=decoded;
                         next();
                      }
                    });    
        }
        else
        {
             res.json({success:false,message:'Token not provided'});
        }
    });
    router.post('/home',function(req,res)
    {
       res.send(req.decoded); 
    });
     router.post('/create',function(req,res)
    {
       
      console.log(req.body);
      if(req.body.title && req.body.content)
      {
        blogmodel.update({email:req.body.email},
                {$push: {posts:{title:req.body.title,uploadPostContent:req.body.content,likeCount:0,
                                       countComment:0}}}
              ).then(function(succ,err)
                  {if(err)
                     {  console.log(err);
                        res.json({success:false,message:'failed to create new blog'});
                     }
                   else
                     {
                        res.json({success:true,message:'New blog created'});
                     }
                  });  
      }
     else
      {
        res.json({success:false,message:'ensure title and content of blog were provided'});
      }
  /*     blogmodel.findOne({email:req.body.email}).then(function(user,err)
       {   if(err) throw err;
          else if(req.body.title && req.body.content)
           {
               user.posts.push({title:req.body.title,uploadPostContent:req.body.content,likeCount:0,
                                       countComment:0});
               console.log(user);
               user.save(function(err)
                             { if(err)
                                {console.log(err);
                                res.json({success:false,message:'failed to create new blog'});}
                               else
                               res.json({success:true,message:'New blog created'});
                              });
                
           }
           else
            {
                res.json({success:false,message:'ensure title and content of blog were provided'});
            }
       });*/
    });
    router.get('/all',function(req,res)
    {    console.log('in server side');
         blogmodel.find({},function(err,docs)
      {if(err) res.json(err);
        else{console.log(docs);              
           res.json(docs);}
       });
    });
    router.get('/my/:email',function(req,res)
    {    console.log(req.params.email);
      blogmodel.find({email:req.params.email},function(err,docs)
      {if(err) res.json(err);
        else{console.log("myblogs"+docs);              
           res.json(docs);}
       });
    });
    router.put('/inclike/:id',function(req,res)
   {
     console.log(req.params.id);
     console.log(req.body);
    blogmodel.update({email:req.body.email,"posts._id":req.params.id},
                {$push: {"posts.$.likes":{email :req.body.myemail}},
                $inc :{"posts.$.likeCount":1}}
              ).then(function(succ,err)
    {if(err)
      {
          res.json({success:false,message:'failed to like'});
      }
      else
      {
          res.json({success:true,message:'successfully liked'});
      }
    });
     
 /*    blogmodel.findOne({email:req.body.email}).then(function(user,err)
     {
      if(err) throw err;
       var newcount=req.body.count+1;
      user.posts.findByIdAndUpdate(req.params.id,{$set:{likeCount:newcount}},{new:true},function(err,docs)
                           {
                               console.log(docs);
                                docs.push({email:req.body.myemail});
                                user.save();
    });

         
     });*/
  });
  router.put('/declike/:id',function(req,res)
  {console.log(req.params.id);
     console.log(req.body);
     blogmodel.update({email:req.body.email,"posts._id":req.params.id},
                {$pull: {"posts.$.likes":{email :req.body.myemail}},
                $inc :{"posts.$.likeCount":-1}}
              ).then(function(succ,err)
    {if(err)
      {
          res.json({success:false,message:'failed to dislike'});
      }
      else
      {
          res.json({success:true,message:'successfully disliked'});
      }
    });
  });
 
  router.put('/deletepost/:id',function(req,res)
 {
    console.log(req.params.id);
    console.log(req.body);
     blogmodel.update({email:req.body.email},
                {$pull: {posts:{_id:req.params.id}}}).then(function(succ,err)
                               {
                                 if(err)
                                 {
                                   res.json({success:false,message:'failed to delete'});
                                 }
                                 else
                                {
                                  res.json({success:true,message:'successfully deleted'});
                                }
                               });
  });
   /*router.put('/edit/:id',function(req,res)
   {
     console.log(req.params.id);
     console.log(req.body);
    blogmodel.update({email:req.body.email,"posts._id":req.params.id},
                {$set:{"posts.$.title":req.body.title,"posts.$.uploadPostContent":req.body.uploadPostContent}}
              ).then(function(succ,err)
    {if(err)
      {
          res.json({success:false,message:'failed to like'});
      }
      else
      {
          res.json({success:true,message:'successfully liked'});
      }
    });*/
    return router;
}

