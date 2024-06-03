const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const users = [{ id: 1, name: "Andrey", lastname: "Molina" }];

app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: "*"

}));

//1.

app.get('/hello', function (req, res) {
    const response = [
        { response: "Hello World" }
    ];
    res.json(response);
});


//2.
app.get('/hello2', function (req, res) {
    const message = req.query.message;
    const response = [
        { response: "Hello " + message }
    ];
    res.json(response);
});

//3.
app.post('/user', function (req, res) {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        lastname: req.body.lastname
    };
    users.push(user);

    const response = [
        { response: "El usuario "+user.name+" "+user.lastname+" fue creado" }
    ];
    res.json(response);

});

app.listen(3001, () => console.log('type service listening on port 3001!'));