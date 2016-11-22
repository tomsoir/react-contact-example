'use strict'

var refs = {};

module.exports = {
    trigger: function(event) {
        if(refs[event]){
            var ref = refs[event].thisRef;
            var arg = Array.prototype.slice.call(arguments, 1);
            refs[event].func.apply(ref, arg);
        }
    },
    bind : function(context, name, callback) {
        refs[name] = { thisRef: context, func: callback};
    },
}