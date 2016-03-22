var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var Timer = require('./Timer/Timer');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

const TIMELEFT = 25;

var Main = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            timeLeft: TIMELEFT,
            timeDisplay:TIMELEFT.toString()
      }
    },
    // called bfr component mounts
    componentWillMount: function(){
      this.ref = new Firebase('https://bloctime-v2.firebaseIO.com');
      var childRef = this.ref.child(this.props.params.username);
      //this.bindAsArray(childRef, 'notes');
      this.bindAsArray(this.ref, 'notes');

      console.log("timeLeft in WillMount:", this.state.timeLeft);
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

    handleTime: function(btnLabel){
        // manage time based on button click
        // run tick function every second
        if( btnLabel == "Start")
        { this.timer = setInterval(this.tick, 1000); }
        else
        {
            clearInterval(this.timer);
            this.setState({timeLeft: 25});
console.log("timeLeft in handleTime - bfr timeout:", this.state.timeLeft);

var t=25;
this.setState({timeLeft: t} );
this.state.timeLeft = 25;

setTimeout(function() { var x=1 }, 100000);
this.setState({timeLeft: 25});
              console.log("timeLeft in handleTime:", this.state.timeLeft);
            this.tick();
        }
    },
    tick: function(){
        if(this.state.timeLeft > 0)
        {

          var t = this.state.timeLeft;

          var m = Math.round(t/60);
          if(m < 10){ m = "0" + m; }
          var s = t%60;
          if(s < 10){ s = "0" + s; }

          var tString = m + ':' + s;
          this.setState({timeLeft: t-1} );
          this.setState({timeDisplay: tString});
        }
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
                  timeDisplay={this.state.timeDisplay}
                  handleTime={this.handleTime} />
             </div>
           </div>
        )
   }
});

module.exports = Main;
