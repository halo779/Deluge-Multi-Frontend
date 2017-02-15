#!/usr/bin/env node 
'use strict';

let fs = require('fs');

//@TODO: Add Configuation loading here.

let app = require('./appserver');

let port = 8080;

app.set('port', port);

let server = require('http').createServer(app);

server.listen(port);