'use strict'

var React = require('react');
var mediator = require('../utils/mediator.js');

var TableTh = React.createClass({
    fireSort: function(key){
        return function(event){ 
            mediator.trigger('sort', key) 
        };
    },
    render: function() {
        return (<th className="sorter" onClick={this.fireSort(this.props.name)}>{this.props.title}</th>);
    }
});

var TableTd = React.createClass({
    render: function() {
        return (<td>{this.props.data[this.props.name]}</td>);
    }
});

var TableTrTd = React.createClass({
    fireDelete: function() {
        mediator.trigger('delete', this.props.contact);
    },
    fireEdit: function() {
        mediator.trigger('edit', this.props.contact);
    },
    render: function() {
        var data = this.props.contact;
        return (
            <tr>
                {this.props.fields.map(function(item, i){
                    if(!item.hide)
                        return <TableTd key={item.name+'_td'} name={item.name} data={data}/>;
                })}
                <td className="center">
                    <button className="remove" onClick={this.fireDelete}>
                        <svg style={{"fill":"rgb(255, 0, 0)"}}  version="1.1" viewBox="0 0 295.82 295.82">
                            <path d="M147.91,0C66.124,0,0,66.124,0,147.91s66.124,147.91,147.91,147.91s147.91-66.124,147.91-147.91S229.696,0,147.91,0z     M147.91,278.419c-71.345,0-130.509-59.164-130.509-130.509S76.565,17.401,147.91,17.401S278.419,76.565,278.419,147.91    S219.255,278.419,147.91,278.419z"/>
                            <path d="m189.673,106.147c-3.48-3.48-8.701-3.48-12.181,0l-30.452,30.453-30.452-30.452c-3.48-3.48-8.701-3.48-12.181,0s-3.48,8.701 0,12.181l30.452,30.452-30.452,30.452c-3.48,3.48-3.48,8.701 0,12.181 1.74,1.74 5.22,1.74 6.96,1.74s5.22-1.74 5.22-1.74l30.452-30.452 30.452,30.452c1.74,1.74 5.22,1.74 6.96,1.74 1.74,0 3.48-1.74 5.22-1.74 3.48-3.48 3.48-8.701 0-12.181l-30.452-30.452 30.452-30.452c3.483-3.481 3.483-8.702 0.002-12.182z"/>
                        </svg>
                    </button>
                </td>
                <td className="center">
                    <button className="edit" onClick={this.fireEdit}>
                        <svg style={{"fill":"rgb(0, 109, 240)"}} version="1.1" viewBox="0 0 64 64" >
                            <path d="M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32S49.673,0,32,0z M32,62C15.432,62,2,48.568,2,32      C2,15.432,15.432,2,32,2c16.568,0,30,13.432,30,30C62,48.568,48.568,62,32,62z"/>
                            <path d="M43.012,22.307l-6.789-4.033c-0.938-0.557-2.137-0.227-2.678,0.738L26.254,32.35l-0.979,1.746      c-0.319,0.568-0.781,1.278-0.735,2.021L24.012,45c0,0,0.413,2,1.988,2v-0.014c0.283-0.006,0.565-0.064,0.826-0.198l7.306-4.976      c0.647-0.328,1.009-1.099,1.327-1.666l0.98-1.748l0.49-0.873l6.799-12.464C44.271,24.097,43.949,22.863,43.012,22.307z       M37.682,32.152l-2.449,4.365l-0.49,0.873c0,0-0.352,0.625-0.98,1.746c-0.629,1.122-1.966,2.187-2.452,2.432l-3.718,3.011      c-0.44,0.226-0.959,0.207-1.383-0.045s-0.698-0.705-0.729-1.209l0.674-4.818c-0.034-0.555,0.182-2.271,0.817-3.401      c0.635-1.133,1.96-3.494,1.96-3.494l1.96-3.493l1.429-2.661l6.791,4.031L37.682,32.152z M40.042,27.759l-6.792-4.031      l1.992-3.708l6.79,4.033L40.042,27.759z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        );
    }
});

module.exports = React.createClass({
    getDefaultProps: function() {
        return {contacts: []};
    },
    render: function() {
        var fields = this.props.fields;
        return (
            <table>
                <thead>
                    <tr>
                        {fields.map(function(item, i){
                            if(!item.hide)
                                return <TableTh key={item.name+'_th'} name={item.name} title={item.title}/>
                        })}
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.contacts.map(function(contact, i){
                        return <TableTrTd key={i} contact={contact} fields={fields}/>
                    })}
                </tbody>
            </table>
        );
    }
});
