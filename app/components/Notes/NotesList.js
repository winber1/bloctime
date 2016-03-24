var React = require('react');

var NotesList = React.createClass({
  render: function(){
    var notes = this.props.notes.map(function(note, index){
      return <tr  key={index}><td> {note['.value']}</td></tr>
    })

    return(
      <table className="table table-striped"><tbody>
        {notes}
      </tbody></table>
    )
  }
});

module.exports = NotesList;
