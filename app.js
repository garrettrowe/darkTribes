/*eslint-env node*/
var express = require('express');
var http = require("http");
var https = require("https");
var uuid = require('node-uuid');
var rp = require("request-promise");
var cors = require('cors')
var cfenv = require('cfenv');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const WatsonML = require("watson-ml-model-utils");
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

var appEnv = cfenv.getAppEnv();

var socketMap = [];

var NLparams = {'features': {'entities': {'emotion': true, 'sentiment': false, 'limit': 10 }, 'keywords': {'emotion': true, 'sentiment': false, 'limit': 10 }, 'emotion': {}, 'sentiment': {}, } }
var PIparams = {content_type: 'application/json', consumption_preferences: true, raw_scores: true };
const model = ["consumption_preferences_automobile_ownership_cost", "consumption_preferences_automobile_safety", "consumption_preferences_books_autobiographies", "consumption_preferences_books_entertainment_magazines", "consumption_preferences_books_financial_investing", "consumption_preferences_books_non_fiction", "consumption_preferences_clothes_comfort", "consumption_preferences_clothes_quality", "consumption_preferences_clothes_style", "consumption_preferences_concerned_environment", "consumption_preferences_credit_card_payment", "consumption_preferences_eat_out", "consumption_preferences_gym_membership", "consumption_preferences_influence_brand_name", "consumption_preferences_influence_family_members", "consumption_preferences_influence_online_ads", "consumption_preferences_influence_social_media", "consumption_preferences_influence_utility", "consumption_preferences_movie_action", "consumption_preferences_movie_adventure", "consumption_preferences_movie_documentary", "consumption_preferences_movie_drama", "consumption_preferences_movie_historical", "consumption_preferences_movie_horror", "consumption_preferences_movie_musical", "consumption_preferences_movie_romance", "consumption_preferences_movie_science_fiction", "consumption_preferences_movie_war", "consumption_preferences_music_classical", "consumption_preferences_music_country", "consumption_preferences_music_hip_hop", "consumption_preferences_music_latin", "consumption_preferences_music_live_event", "consumption_preferences_music_playing", "consumption_preferences_music_r_b", "consumption_preferences_music_rap", "consumption_preferences_music_rock", "consumption_preferences_outdoor", "consumption_preferences_read_frequency", "consumption_preferences_spur_of_moment", "consumption_preferences_start_business", "consumption_preferences_volunteer"];

// Dynamic Dashboard
var dde_client_id = "d16e69f0-7bdb-4cdc-8db2-a74af9ef3b97";
var dde_client_secret = "094919e7bf50ba39961a12e530560fa4f9e4bb16";
var dde_base_url = "https://dde-us-south.analytics.ibm.com";
var dde_session_uri = dde_base_url + "/daas/v1/session";

// Natural Lanugae Understanding
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'ded72180-9075-4c1b-8892-a7dcbce86603',
    'password': 'mOWFVbolUlh4',
    'version_date': '2018-03-16'
});

// Personality Insights
var personality_insights = new PersonalityInsightsV3({
    username: '6714b418-afb3-4c82-8745-b337b8842d97',
    password: 'PMUswNh6xyYq',
    version_date: '2017-10-13'
});

// Watson Machine Learning
var WatsonMLoptions = {
    servicePath:"https://ibm-watson-ml.mybluemix.net",
    username:"646237cd-7fc6-422c-a1fc-4ccd64dedcb2",
    password:"41c8db45-5a65-4534-956a-3cc40b499e31",
    instanceId:"ca098a53-2ac4-4648-a183-712a3a91f98a",
    modelId:"7d87b0bc-6f38-4964-bd30-187720935c47",
    deploymentId:"11eab9c7-7844-4111-9f10-14030e0bc403",
    deploymentName: "brandPrediction"
}

const watsonMLScoringEndpoint = new WatsonML.WatsonMLScoringEndpoint(model, WatsonMLoptions);
const csvStringifier = createCsvStringifier({header: [{id: 'name', title: 'Name'}, {id: 'value', title: 'Percentile'}, {id: 'category', title: 'Category'}, ]});

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.get("/session", function(request, response) {
    var options = {
        method: "POST",
        uri: dde_session_uri,
        headers: {
            "Authorization": "Basic " + new Buffer(dde_client_id + ":" + dde_client_secret).toString("base64"),
            "content-type": "application/json"
        },
        body: {
            "expiresIn": 3600,
            "webDomain": process.env.APP_BASE_URL
        },
        json: true
    };
    rp(options)
        .then(function(parsedBody) {
            response.send(parsedBody);
        })
        .catch(function(err) {
            console.log("post failed!");
            console.log(JSON.stringify(err));
            response.send(err);
        });
});

app.get('/text', function(req, res) {
    fs.readFile(__dirname + '/text' + req.query.v, function(err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data.toString());
    });

});

app.get('/sentiment.csv', function(req, res) {
    var session = req.query.sessionId;
    NLparams.text = socketMap[session].text;
    natural_language_understanding.analyze(NLparams, function(error, response) {
        if (error)
            console.log('Error:', error);
        else {
            var rawdata = [];
            var pos = {};
            var sentiment = response.sentiment.document.score * 100;
            pos.name = "Positive";
            pos.value = 50 + (sentiment / 2);
            pos.category = "Sentiment";
            rawdata.push(pos);
            var neg = {};
            neg.name = "Negative";
            neg.value = 50 - (sentiment / 2);
            neg.category = "Sentiment";
            rawdata.push(neg);
            res.send(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rawdata));
        }
    });
});

app.get('/needs.csv', function(req, res) {
    var session = req.query.sessionId;
    PIparams.text = socketMap[session].text;
    personality_insights.profile(PIparams, function(error, response) {
        if (error)
            console.log('Error:', error);
        else {
            var rawdata = [];
            var p = response.needs;
            for (var i = p.length - 1; i >= 0; i--) {
                var entry = {};
                entry.name = p[i].name;
                entry.value = Math.floor((p[i].percentile) * 100);
                entry.category = "Needs";
                rawdata.push(entry);
            }
            res.send(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rawdata));
        }
    });
});

app.get('/values.csv', function(req, res) {
    var session = req.query.sessionId;
    PIparams.text = socketMap[session].text;
    personality_insights.profile(PIparams, function(error, response) {
        if (error)
            console.log('Error:', error);
        else {
            var rawdata = [];
            var p = response.values;
            for (var i = p.length - 1; i >= 0; i--) {
                var entry = {};
                entry.name = p[i].name;
                entry.value = Math.floor((p[i].percentile) * 100);
                entry.category = "Values";
                rawdata.push(entry);
            }
            res.send(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rawdata));
        }
    });
});

app.get('/prediction.csv', function(req, res) {
    var session = req.query.sessionId;
    var rawdata = [];
    if (typeof(socketMap[session].prediction) != "undefined"){
        var mscores = socketMap[session].prediction.data.values[0][socketMap[session].prediction.data.fields.indexOf("probability")];
        var mnames = socketMap[session].prediction.data.values[0][socketMap[session].prediction.data.fields.indexOf("nodeADP_classes")];
        for (var i = mnames.length - 1; i >= 0; i--) {
            var entry = {};
            entry.name = mnames[i];
            entry.value = Math.floor((mscores[i]) * 100);
            entry.category = "Brand Prediction";
            rawdata.push(entry);
        }
    }
    res.send(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rawdata));
});


io.on('connection', function(socket) {
    appSocket = socket

    socket.on('disconnect', function() {
    });
    socket.on('register', function(session) {
        socket.join(session);
        socketMap[session] = socket;
        setTimeout(function() {  
            socketMap.splice(session, 1);
        }, 1800000);
    });
    socket.on('sendConversation', function(data, session) {
        socketMap[session].text = data;
        socketMap[session].emit("runChart", true);
        PIparams.text = socketMap[session].text;
        personality_insights.profile(PIparams, function(error, response) {
            if (error)
                console.log('Error:', error);
            else{
                socketMap[session].emit("showProfile", response);
                var traits = new Array(42);
                var scores = response.consumption_preferences;
                for (x=0; x<scores.length; x++){
                    for (y=0; y<scores[x].consumption_preferences.length; y++){
                        traits[model.indexOf(scores[x].consumption_preferences[y].consumption_preference_id)] = scores[x].consumption_preferences[y].score;
                    }
                }
                //console.log("Entry Traits:" + traits.toString());
                watsonMLScoringEndpoint.score(traits)
                .then((response) => {
                    socketMap[session].prediction = response;
                    socketMap[session].emit("showPrediction", response.data.values[0][response.data.fields.indexOf('nodeADP_class')]);
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
            }
        });
    });
});

http.listen(appEnv.port, function() {
    console.log("Magic happening on " + appEnv.url);
});

require("cf-deployment-tracker-client").track();