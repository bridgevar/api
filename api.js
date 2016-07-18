var express = require('express');
var app = express();
var request = require('request');
app.get('/', function(req, res) {
    request(
        'https://raw.githubusercontent.com/bridgevar/bridgevar-js/master/users.json',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.write(body);
                res.end();
            }
        })
});
app.get('/multiway', function(req, res) {
    request(
        'https://raw.githubusercontent.com/bridgevar/bridgevar-js/master/users.json',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var stuff = JSON.parse(body);
                res.write('{"users": [');
                for (i in stuff.users) {
                    if (stuff.users[i]["oneway"] == false) {
                        res.write(JSON.stringify(stuff.users[i]));
                        if (i == stuff.users.length - 1) {} else {
                            res.write(",");
                        }
                    }
                }
                res.write("]}")
                res.end();
            }
        })
});
app.get('/oneway', function(req, res) {
    request(
        'https://raw.githubusercontent.com/bridgevar/bridgevar-js/master/users.json',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var stuff = JSON.parse(body);
                res.write('{"users": [');
                for (i in stuff.users) {
                    if (stuff.users[i]["oneway"] == true) {
                        res.write(JSON.stringify(stuff.users[i]));
                        if (i == stuff.users.length - 1) {} else {
                            res.write(",");
                        }
                    }
                }
                res.write("]}")
                res.end();
            }
        })
});
app.get('/online', function(req, res) {
    request(
        'https://crossorigin.me/https://scratch.mit.edu/varserver/115628457',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var p = (JSON.parse(body).variables.map(function(
                        inp) {
                        return ((new Date().getTime() - inp
                            .value) < 60000);
                    }).indexOf(true) != -1) ? '{"online":"true"}' :
                    '{"online":"false"}'; /*As you can tell, I am a fan of one-liners :P */
                res.write(p);
                res.end();
            }
        })
});
app.get('/project/*', function(req, res) {
    var project = req.originalUrl.replace("/project/", "");
    request(
        'https://raw.githubusercontent.com/bridgevar/bridgevar-js/master/users.json',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var stuff = JSON.parse(body);
                res.write('{"users": [');
                for (i in stuff.users) {
                    if (stuff.users[i]["secondProjectId"] ==
                        project || stuff.users[i]["firstProjectId"] ==
                        project) {
                        res.write(JSON.stringify(stuff.users[i]));
                        if (i == stuff.users.length - 1) {} else {
                            res.write(",");
                        }
                    }
                }
                res.write("]}")
                res.end();
            }
        })
});
app.listen(8081, function() {
    console.log('Listening at Port 8081,');
});
