var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

//github credentials
const CLIENT_ID = "2b7e4957f446b236ff57";
const CLIENT_SECRET = "6400267924addc48e8ee799279759a22ded955d3";

var app = express();

app.use(cors());
app.use(bodyParser.json());

//code being passed from the frontend
app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

// getUserData
// access token is going to be passed in as an Authorization header
app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization") //Bearer Access Token
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

app.listen(4000, function () {
    console.log("CORS server running on port 4000");
})