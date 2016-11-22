var React = require('react');
var mediator = require('../utils/mediator.js');

var Input = React.createClass({
    fireChangeEvent: function() {
        mediator.trigger('input', this.props.id, this.refs.fieldValue.value);
    },
    render: function() {
        return (<input id={this.props.id} name={this.props.id} type={this.props.type} placeholder={this.props.title} ref="fieldValue" disabled={JSON.parse(this.props.disabled)} value={this.props.value} onChange={this.fireChangeEvent} />);
    }
});

module.exports  = React.createClass({
    commitForm: function() {
        mediator.trigger('submit');
    },
    setEditValues: function(){
        if(this.props.edit){
            var props = this.props;
            this.props.fields.forEach(function(item){
                props.data[item.name] = props.edit[item.name];
            });
        }
    },
    render: function() {
        this.setEditValues()
        const inputData = this.props.data;
        const buttonTitle = this.props.edit?'Edit':'Add';
        return (
            <div className="add-control">
                {this.props.fields.map(function(item, i){ 
                    if(!item.hide)
                        return <label key={item.name+'_label'}>
                            <Input type="text" id={item.name} title={item.title} disabled={false} value={inputData[item.name]}/>
                        </label>;
                })}
                <label>
                    <button onClick={this.commitForm}>
                        <svg style={{"fill":"rgb(0, 109, 240)"}} version="1.1" viewBox="0 0 363.025 363.024" >
                            <path d="M181.512,0C81.422,0,0,81.424,0,181.513c0,100.088,81.422,181.512,181.512,181.512    c100.089,0,181.513-81.424,181.513-181.512C363.025,81.424,281.601,0,181.512,0z M181.512,351.314    c-93.626,0-169.802-76.175-169.802-169.802S87.886,11.71,181.512,11.71c93.627,0,169.803,76.176,169.803,169.803    S275.139,351.314,181.512,351.314z"/>
                            <polygon points="187.368,111.25 175.658,111.25 175.658,175.657 111.25,175.657 111.25,187.368     175.658,187.368 175.658,251.775 187.368,251.775 187.368,187.368 251.776,187.368 251.776,175.657 187.368,175.657   "/>
                        </svg>
                    </button>
                </label>
            </div>
        );
    }
});
