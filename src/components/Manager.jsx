'use strict'

var React = require('react');
var Table = require('./Table.jsx');
var Count = require('./Counter.jsx');
var Forms = require('./Form.jsx');
var Filter= require('./Filter.jsx');

var model    = require('../utils/model.js');
var common   = require('../utils/common.js');
var mediator = require('../utils/mediator.js');

module.exports = React.createClass({
    getInitialState: function() {
        model.presetDefault();
        return model.defaults;
    },
    componentDidMount: function() {

        mediator.bind(this, 'filter', function(newFilterValue) {
            this.setState({nameFilter: newFilterValue});
        });

        mediator.bind(this, 'input', function(fieldKey, fieldValue) {
            var newState = this.state;
            newState.forms.newContact[fieldKey] = fieldValue;
            this.setState(newState);
            this.setState({contactEdit: undefined});
        });

        mediator.bind(this, 'submit', function() {
            var contacts = this.state.contacts;
            var submited = this.state.forms.newContact;
            var state = common.inputValidation(submited, model.getFields());
            
            if(state){
                var result = common.updateContacts(contacts, submited);
                this.setState(model.clear(result));
            }
        });

        mediator.bind(this, 'delete', function(contact) {
          var result = model.remove(contact);
          this.setState({contacts: result});
        });

        mediator.bind(this, 'edit', function(contact) {
          this.setState({contactEdit: contact});
        });

        mediator.bind(this, 'sort', function(key){
          this.setState(model.sortby(key));
        });

    },
    getContacts: function() {
        var fileds = model.getFields();
        return common.filterContacts(this, fileds);
    },
    getContactCount: function() {
        return this.state.contacts.length;
    },
    render: function() {
        return (
            <section>
                <div id='list'>
                    <h1>React contact manager</h1>
                    <Count contactCount={this.getContactCount()} contactFilter={this.getContacts().length} />
                    <Filter value={this.state.nameFilter}/>
                    <Table contacts={this.getContacts()} fields={model.getFields()}/>
                </div>
                <div id='form'>
                    <Forms data={this.state.forms.newContact} edit={this.state.contactEdit} fields={model.getFields()} />
                </div>
            </section>
        );
    }
});
