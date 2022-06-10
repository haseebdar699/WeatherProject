const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=jammu&appid=bfdbb4af3b568b1c4e3af977a4f9ca46&units=metric";

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const discription = weatherData.weather[0].discription;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + " @2x.png";
            res.write("<p>the weather is currently " + discription);
            res.write("<h1>the temp in is " + temp + " degree</h1>");
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    });
});
// res.sendFile(__dirname + "/index.html");
//});
// app.post("/", function(req, res) {
//     console.log(req.body.ci);





app.listen(3000, function(req, res) {
    console.log("server is running at port 3000");
});