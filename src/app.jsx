'use strict'

require("./style.css");

var React     = require('react');
var ReactDom  = require('react-dom');
const Manager = require('./components/Manager.jsx');
const wrapper = document.getElementById('app');

ReactDom.render(<Manager />, wrapper)