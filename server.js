var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


var config = {
  host: 'db.imad.hasura-app.io',
  user: 'srivatsathin',
  password: process.env.DB_PASSWORD,
  database: 'srivatsathin',
  port:'5432'
};


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    
 pool.query('SELECT * FROM test',function(err,result){
 if(err){
     res.status(500).send(err.toString());
 }
 else {
     res.send(JSON.stringify(result.rows));
 }
 }
 ); 
});


var counter= 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names =[];
app.get('/submit-name',function(req,res){
   var name= req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});



var articles = { 'article-one' : {title: "Srivats athindran !!!",
heading : "article-one",
date : "oct 07,2016",
content : `<div>
            <h1>
                Magizhchi !!!
            </h1>
            <p>
               First paragraph for the article will be displayed here 
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
            </p>
            <h2>
                SECOND !!!
            </h2>
            <p>
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
            </p>
        </div`},
        'article-two' : { title: "Srivats athindran !!!",
heading : "article-two",
date : "oct 07,2016",
content : `<div>
            <h1>
                Magizhchi !!!
            </h1>
            <p>
               First paragraph for the article will be displayed here 
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
            </p>
            <h2>
                SECOND !!!
            </h2>
            <p>
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
            </p>
        </div>`},
        'article-three' : { title: "Srivats athindran !!!",
heading : "article-three",
date : "oct 07,2016",
content : `<div>
            <h1>
                Magizhchi !!!
            </h1>
            <p>
               First paragraph for the article will be displayed here 
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
               First paragraph for the article will be displayed here
            </p>
            <h2>
                SECOND !!!
            </h2>
            <p>
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
                Second paragraph for the article will be displayed here
            </p>
        </div>`}
};

function Createtemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;

        
   var htmltemplate=   ` <html>
    <head>
        <title>
            COOL !!!
        </title>
        <meta name= "viewport" content="width-device-width,initial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
     <div class="container">
        <div>
             ${title}
        </div>
        <hr/>
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <div>
            ${heading}
        </div>
        <div>
            ${date.toDateString()}
        </div>
        ${content}
     </div>
    </body>
</html>`;
return htmltemplate;
}
     

app.get('/articles/:articlename', function (req, res) {
    
    pool.query("SELECT * FROM article WHERE title= $1",[req.params.articlename], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } 
        else{
            if(result.rows.length === 0){
                res.status(404).send('Article not found');
            } else{
                var articleData= result.rows[0];
                 res.send(Createtemplate(articleData));
            }
        }
    }
    
);
    
});




app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
