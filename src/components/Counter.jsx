'use strict'

var React = require('react');

module.exports  = React.createClass({
    render: function() {
        var filter = this.props.contactFilter;
        var total  = this.props.contactCount;
        var state  = (total!=filter?<span>, Found: <b>{filter}</b></span>:'')
        return (
            <div id='counter'>Total: <b>{this.props.contactCount}</b>{state}</div>
        );
    }
});
