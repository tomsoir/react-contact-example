'use strict'

var React = require('react');
var mediator = require('../utils/mediator.js');

module.exports = React.createClass({
    filterChange: function() {
        mediator.trigger('filter', this.refs.searchInput.value);
    },
    render: function() {
        return (<input ref="searchInput" value={this.props.value} type="text" name="filter" id="filter" placeholder="Filter" onChange={this.filterChange} />);
    }
});
