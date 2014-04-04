/**
 * Created by James on 4/4/14.
 */

var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

var svc = require('./service');

svc.registerServices(app);


app.listen(3000);
console.log('express server start at port 3000');