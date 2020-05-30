const mongoose= require('mongoose');
const Schema=mongoose.Schema;
var bcrypt=require('bcrypt');
const saltRounds = 10;
const blogSchema= new Schema({
                               email:{type:String,required:true,unique:true,lowercase:true},
                               password:{type:String,required:true,unique:true},
                               userActivities:[],
                               followers:[],
                               posts:[
                                     { 
                                       title:String,
                                       uploadPostContent:String,
                                       comments:[{email:String,
                                                  content:String
                                                 }],
                                       likes:[{email:String}],
                                       likeCount:Number,
                                       countComment:Number
                                     }
                                     ],
                              userDetail:{firstname:{type:String,required:true},
                                            lastname:{type:String,required:true},
                                            gender:{type:String,required:true}
                                           }
                               
                            });
blogSchema.pre('save',function(next)
              {
                var user=this;
                bcrypt.hash(user.password,saltRounds,function(err,hash){
                   if(err) return next(err);
                    user.password=hash;
                    next();
                 });
             });
/*blogSchema.methods.confirmPassword=function(password)
{   var result;*/
    /*console.log(bcrypt.compareSync(password,this.password));
    return bcrypt.compareSync(password,this.password);*/
/*    bcrypt.compare(password,this.password,function(err,res){
       console.log("first"+res);
      result=res;
      
});
  console.log("second"+result);
 return result;
};*/
module.exports=mongoose.model('blogmodel',blogSchema,'blogcollection');