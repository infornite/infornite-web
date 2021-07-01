const sslRedirect = require('heroku-ssl-redirect').default
const express = require('express');
const app = express();

app.use(sslRedirect());
app.use(express.static('./dist/n4'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/n4/'}),
);

app.listen(process.env.PORT || 8080);