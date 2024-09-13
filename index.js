const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(cors());

// const sslOptions = {
//     key: fs.readFileSync('private-key.pem'),
//     cert: fs.readFileSync('certificate.pem')
// };

// Proxy requests to /api/ to the non-secure HTTP API
app.use('/sub', createProxyMiddleware({
    target: 'https://dev.subterfuge-game.com/game/',
    changeOrigin: true,
    secure: false,  // To allow non-HTTPS
    pathRewrite: {
        '^/sub': '',  // Remove '/api' from the proxied request
    },
    logger: console,
    // agent: new https.Agent({ rejectUnauthorized: false }),
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${req.url}`);
    }
}));

// Start the server
// https.createServer(sslOptions, app).listen(3000, () => {
//     console.log('Proxy server is running on https://localhost:3000');
// });

app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});
