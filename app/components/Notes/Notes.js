var React = require('react');
var NotesList = require('./NotesList');
var AddNote = require('./AddNote');

var Notes = React.createClass({
  propTypes: {
    notes: React.PropTypes.array.isRequired,
    addNote: React.PropTypes.func.isRequired
  },
  render: function(){
  //console.log(this.props.notes.length);
    var sortedNotes = this.props.notes.map(function(note, id)
      { return <NotesList key={id} data={note} /> });
    sortedNotes.reverse();

    return(
        <div>
            <h3> Task history </h3>
            <AddNote addNote={this.props.addNote} />
            <table className="table table-striped"><tbody>
            { sortedNotes }
            </tbody></table>
        </div>
    )
  }
});

module.exports = Notes;
