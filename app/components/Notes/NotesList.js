var React = require('react');

var NotesList = React.createClass({
  render: function(){
    var notes = this.props.notes.map(function(note)
    {
      return <tr  key={note.id}><td> {note['.value']}</td></tr>
    })
    notes.reverse();

    return(
      <table className="table table-striped"><tbody>
        {notes}
      </tbody></table>
    )
  }
});

module.exports = NotesList;
