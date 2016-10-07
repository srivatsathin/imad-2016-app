var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var articleone ={ title: "Srivats athindran !!!",
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
        </div>` };
        
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
            ${date}
        </div>
        ${content}
     </div>
    </body>
</html>`;
return htmltemplate;
}
     

app.get('/article-one', function (req, res) {
  res.send(Createtemplate(articleone));
});


app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html')); 
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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
