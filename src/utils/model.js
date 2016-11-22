'use strict'

// First Name, Last Name, Phone number, Address, Email 
var mock = [
    {id: 0, firstname: 'Artem',     lastname: 'Tkachenko',  phonenumber: '+7(905)798-47-64', address: 'Earth',  email: 'tomsoir@gmail.com'},
    {id: 1, firstname: 'William',   lastname: 'Shakespeare',phonenumber: '1234567890',       address: 'Uran',   email: 'w.shakespeare@gmail.com'},
    {id: 2, firstname: 'Kit',       lastname: 'Richards',   phonenumber: '1fu*kRockMe',      address: 'Mars',   email: 'k.richards@gmail.com'},
    {id: 3, firstname: 'Leonardo',  lastname: 'Da Vinci',   phonenumber: 'phone here',       address: 'Venera', email: 'email here'},
];

var fields = [
    { name: 'id',           title: 'ID',            hide: true },
    { name: 'firstname',    title: 'First Name',    hide: false },
    { name: 'lastname',     title: 'Last Name',     hide: false },
    { name: 'phonenumber',  title: 'Phone Number',  hide: false },
    { name: 'address',      title: 'Address',       hide: false },
    { name: 'email',        title: 'Email',         hide: false},
];

module.exports = {
    defaults: {
        contacts    : '',
        nameFilter  : '',
        contactEdit : '',
        forms       : {},
        sortField   :'firstname'
    },
    getFields: function(){
        return fields;
    },
    presetDefault: function(){
        this.defaults.forms.newContact = this.presetFileds();
        this.defaults.contacts = mock;
    },
    presetFileds: function(){
        var result = {};
        this.getFields().forEach((item) => {result[item.name]=''});
        return result;
    },
    clear: function(contacts){
        this.nulledProps();
        return {
            contacts: (contacts || ''),
            forms: this.defaults.forms,
            contactEdit: undefined,
        }
    },
    remove: function(contact){
        this.nulledProps();
        this.defaults.contacts = this.defaults.contacts.filter(function(c) {
            return c.id !== contact.id;
        });
        return this.defaults.contacts;
    },
    sortby: function(key){
        var sortedContacts = this.defaults.contacts.slice(0).sort(function(a,b) {
            return (a[key] > b[key]) ? 1 : (a[key] < b[key]) ? -1 : 0;
        });
        this.nulledProps();
        this.defaults.contacts = sortedContacts;
        this.defaults.sortField= key;
        return this.defaults;
    },
    nulledProps: function(){
        this.defaults.contactEdit = undefined;
        this.defaults.forms.newContact = this.presetFileds();
    }
}