var React = require('react');

var AddNote = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    addNote: React.PropTypes.func.isRequired
  },
  setRef: function(ref){
    this.note = ref;
  },
  handleSubmit: function(){
    var newNote = this.note.value;
    this.note.value = '';
    this.props.addNote(newNote)
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function(){
    return (
      <div className="form-group">
        <form onSubmit={ this.handleSubmit } >
            <input type="text" className="form-control"
                onChange={ this.onChange }
                ref={this.setRef}/>
            <button type="button" className="btn btn-default btn-sm right"
                onClick={this.handleSubmit}>Add Task</button>
        </form>
      </div>
    )
  }
});

module.exports = AddNote;
