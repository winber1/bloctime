var React = require('react');

var NotesList = React.createClass({
render: function(){
    return <tr><td> {this.props.data['.value']}</td></tr>
  }
});

module.exports = NotesList;


//return <tr  key={note.id}><td> {note['.value']}</td></tr>
