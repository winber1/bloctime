var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var Timer = require('./Timer/Timer');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Main = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            notes: [1,2,3],
            bio: {
                name:'winnie e'
            },
            repos: ['a','b','c'],
            timeLeft: 5
      }
    },
    // called bfr component mounts
    componentWillMount: function(){
      this.ref = new Firebase('https://bloctime-v2.firebaseIO.com');
      var childRef = this.ref.child(this.props.params.username);
      //this.bindAsArray(childRef, 'notes');
      this.bindAsArray(this.ref, 'notes');
    },

    componentWillUnmount: function(){
      this.unbind('notes');
      clearInterval(this.timer);  //??always or just when set??
    },

    onChange: function(e) {
      this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var idx = this.state.notes.length - 1;
      var text = this.state.text;
      console.log("text:", this.state.text);
      this.ref.child(this.state.notes.length).set(this.state.text);
      this.setState({ text: "" });
    },

    handleAddNote: function(newNote){
        this.ref.child(this.state.notes.length).set(newNote);
    },

    handleTime: function(newNote){
        // manage time based on button click
        // run tick function every second
        this.timer = setInterval(this.tick, 1000);
    },
    tick: function(){
        if(this.state.timeLeft > 0)
        { this.setState({timeLeft: this.state.timeLeft-1} ); }
        else
        { clearInterval(this.timer); }
    },

    render: function(){
       return(
           <div className='row'>
             <div className='col-md-4'>
                <form onSubmit={ this.handleSubmit }>
                <input onChange={ this.onChange } value={ this.state.text } />
                <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
                </form>
             </div>

             <div className='col-md-4'>
               <Notes
                  username={this.props.params.username}
                  notes={this.state.notes}
                  addNote={this.handleAddNote} />
             </div>

             <div className='col-md-4'>
                <Timer
                  timeLeft={this.state.timeLeft}
                  handleTime={this.handleTime} />
             </div>
           </div>
        )
   }
});

module.exports = Main;
