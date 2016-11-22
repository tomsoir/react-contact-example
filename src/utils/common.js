module.exports = {
    updateContacts: function(contacts, submited) {
        // Filter already existing 
        // item (while Edit item mode)
        var sortOrder = undefined;
        var editedItem= contacts.find(function(item, i){
            if(item.id === submited.id){ sortOrder = i; return true; }
        });
        // On Edit mode
        if(editedItem){
            submited.id = editedItem.id;
            contacts[sortOrder] = submited;
        // On Add mode 
        }else{
            submited.id = (new Date()).getTime();
            contacts.push(submited)
        }
        return contacts;
    },

    filterContacts: function(context, fields) {
        if(context.state.nameFilter === '') {
          return context.state.contacts;
        }
        return context.state.contacts.filter(function(contact) {
            return fields.find(function(item){
                var el = String(contact[item.name]);
                if(el.indexOf(context.state.nameFilter) > -1 )
                    return true;
            });
        }.bind(context));
    },

    inputValidation: function(list, fields){
        var state = true;
        fields.forEach((item)=>{
            if(item.name != 'id' && !list[item.name].length)
                state = false;
        });
        return state
    },
}