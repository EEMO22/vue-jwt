const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const events = require('./db/events.json');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
    });
});

app.get('/dashboard', verifyToken, (req, res) => {  //  미들웨어 req.token을 지정
    jwt.verify(req.token, 'the_secret_key', err => {    //  token 확인하기
        if (err) {  //  토큰이 이상하면 401 에러
            res.sendStatus(401);
        } else {  //  토큰이 정상이면 아래 데이터 응답
            res.json({
                events: events
            });
        }
    });
});

app.post('/register', (req, res) => {
    if (req.body) {
        console.log('req.body:', req.body);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        const data = JSON.stringify(user, null, 2);
        let dbUserEmail = require('./db/user.json').email;

        if (dbUserEmail === user.email) {
            res.sendStatus(400);
        } else {
            fs.writeFile('./db/user.json', data, (err) => {
                if (err) {
                    console.log(err + data);
                } else {
                    const token = jwt.sign({ user }, 'the_secret_key');
                    res.json({
                        token,
                        email: user.email,
                        name: user.name,
                    });
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});

app.post('/login', (req, res) => {
    const userDB = fs.readFileSync('./db/user.json');
    const userInfo = JSON.parse(userDB);
    if (
        req.body &&
        req.body.email === userInfo.email &&
        req.body.password === userInfo.password
    ) {
        const token = jwt.sign({ userInfo }, 'the_secret_key');
        res.json({
            token,
            email: userInfo.email,
            name: userInfo.name,
        });
    } else {
        res.sendStatus(400);
    }
});

//  미들웨어
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(401);
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
