require('dotenv').config()
const bodyParser = require('body-parser')
var express = require("express");
var app = express();

app.use(
    (req, res, next) => {
        let informacoes = `${req.method} ${req.path} ${req.ip}`
        console.log(informacoes)
        next()
    }
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get(
    "/",
    (req, res) => {
        res.sendFile(__dirname + "/views/index.html")
        console.log("Roooot")
    }
)

app.use(
    "/public",
    express.static(__dirname + "/public")
)

app.get(
    "/json",
    (req, res) => {
        let message = {"message": "Hello json"}
        if (process.env.MESSAGE_STYLE === "uppercase") {
            res.json({"message": "HELLO JSON"});
          } else {
            res.json(message);
        }
        
    }
)

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString()
        next()
    },
    (req, res) => {
        res.send({time: req.time})
    }
)

// const middleware = (req, res, next) => {
//     req.time = new Date().toString();
//     next();
//    };
    
//    app.get("/now", middleware, (req, res) => {
//     res.send({
//       time: req.time
//     });
//    });
   
app.get(
    "/:word/echo",
    (req, res) => {
        const { word } = req.params
        res.json({echo: word})
    }

)

app.get(
    "/name",
    (req, res) => {
        var firstname = req.query.first
        var lastname = req.query.last

        res.json({name: firstname + " " + lastname})
    }
)

app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
   });
   

























 module.exports = app;
