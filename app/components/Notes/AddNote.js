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
      <div className="input-group">
        <form onSubmit={ this.handleSubmit }>
        <input type="text" className="form-control"
                onChange={ this.onChange } placeholder="Add New Note" ref={this.setRef}/>
          <button className="btn btn-default" type="button"
                onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
/*
      <form onSubmit={ this.handleSubmit }>
      <input onChange={ this.onChange } value={ this.state.text } />
      <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
      </form>
      */
    )
  }
});

module.exports = AddNote;
