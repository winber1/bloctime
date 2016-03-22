var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var Timer = require('./Timer/Timer');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

const TIMELEFT = 3*60;  // sb 25 minutes

var Main = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            timeLeft: TIMELEFT,
            timeDisplay: this.timeFormat(TIMELEFT)
      }
    },
    // called bfr component mounts
    componentWillMount: function(){
      this.ref = new Firebase('https://bloctime-v2.firebaseIO.com');
      var childRef = this.ref.child(this.props.params.username);
      this.bindAsArray(this.ref, 'notes');

      //console.log("timeLeft in WillMount:", this.state.timeLeft);
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
            this.setState({timeLeft: TIMELEFT});
console.log("timeLeft in handleTime - bfr timeout:", this.state.timeLeft);

            this.state.timeLeft = TIMELEFT;  //??why??

//setTimeout(function() { var x=1 }, 100000);
//console.log("timeLeft in handleTime:", this.state.timeLeft);

            this.tick();
        }
    },

    tick: function(){
        if(this.state.timeLeft >= 0)
        {
          var t = this.state.timeLeft;
          this.setState({timeLeft: t-1} );
          this.setState({timeDisplay: this.timeFormat(t)});
        }
        else
        { clearInterval(this.timer); }
    },

    timeFormat: function(t){
        var s = t%60;
        if(s == 0 && (t != TIMELEFT) && (t != 0) )
        {
            t -= 60;
            s = 59;
        }
        if(s < 10){ s = "0" + s; }
        var m = Math.floor(t/60);
        if(m < 10){ m = "0" + m; }

        return( m + ':' + s );
    },

    render: function(){
       return(
           <div className='row'>

             <div className='row'>
                <Timer
                  timeDisplay={this.state.timeDisplay}
                  handleTime={this.handleTime} />
             </div>

             <div className='row'>
               <Notes
                  username={this.props.params.username}
                  notes={this.state.notes}
                  addNote={this.handleAddNote} />
             </div>

             <div className='row hideMe'>
                <form onSubmit={ this.handleSubmit }>
                <input onChange={ this.onChange } value={ this.state.text } />
                <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
                </form>
             </div>
           </div>
        )
   }
});

module.exports = Main;
