var express=require('express');
var bodyParser = require('body-parser');
const mongoose=require('mongoose');
var blogmodel=require('./models/blogmodel');
var path=require('path');
var app=express();
var router=express.Router();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/blog');
var appRoutes=require('./routes/api')(router);
app.use('/api',appRoutes);
mongoose.connection.once('open',function()
                        {
                           console.log('connection has been made,now make fireworks...');
                        }).on('error',function(error)
                             {
                               console.log('connection error',error);
                              });


app.get("*",function(req,res)
       {
          res.sendFile(path.join(__dirname+'/public/views/main.html'));
});
app.listen(8888);
