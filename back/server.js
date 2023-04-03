const express = require("express"); // le package express
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express() ; // initialisation du serveur
const port = process.env.PORT || 8000; // d é finition du port
app.use(bodyParser.json());
app.use(morgan("combined" ) ); // format des messages de log
app.use( cors() ); // autorise les requ ê tes de toute origine
app.use(express.json()) // n é cessaire pour lire des donn é es json
app.use(express.urlencoded({extended:true})); // décompose les formulaires
app.use("", router)

app.use((req , res)=>{
    res.status(404);
    res.json({
    error:"Page not found"
    })
})
app.listen(port , () => console.log ( " listening on port " + port ) );

