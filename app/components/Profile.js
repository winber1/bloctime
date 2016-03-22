var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var Timer = require('./Timer/Timer');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

const WORKTIME = 2*60;  // sb 25 minutes
const BREAKTIME = 1*60;  // sb 5 minutes

var Main = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            timeLeft: WORKTIME,
            timeDisplay: this.timeFormat(WORKTIME),
            onBreak: false
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

    // manage time based on Timer.js button click
    handleTime: function(btnLabel) {
        //console.log("handleTime beg - timeLeft:", this.state.timeLeft);

        // Handle Start click
        if( btnLabel == "Start")
        { this.timer = setInterval(this.tick, 1000); }

        // Handle Reset click
        else
        {
            clearInterval(this.timer);
            if(this.state.onBreak)
            {
                this.setState({timeLeft: BREAKTIME});
                this.state.timeLeft = BREAKTIME;  //??why??
            }
            else
            {
                this.setState({timeLeft: WORKTIME});
                this.state.timeLeft = WORKTIME;
            }

            this.tick();
        }
//console.log("handleTime end - timeLeft:", this.state.timeLeft);
    },

    // seconds countdown and display
    tick: function(){
//console.log("tick beg - timeLeft:", this.state.timeLeft);
        if(this.state.timeLeft >= 0)
        {
          var t = this.state.timeLeft;
          this.setState({timeLeft: t-1} );
          this.setState({timeDisplay: this.timeFormat(t)});
        }
        else
        {
            document.getElementById("myButton").childNodes[0].nodeValue = "Start";

            if(this.state.onBreak)
            {
                this.setState({timeLeft: WORKTIME} );
                this.setState({onBreak: false} );
            }
            else
            {
                this.setState({timeLeft: BREAKTIME} );
                this.setState({onBreak: true} );
            }
            this.setState({timeDisplay: this.timeFormat(this.state.timeLeft)});

            clearInterval(this.timer);
        }
//console.log("tick end - timeLeft:", this.state.timeLeft);
    },

    timeFormat: function(t){
        var s = t%60;
        if(s == 0 && (t != WORKTIME && t != BREAKTIME) && (t != 0) )
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
console.log("render beg - timeLeft:", this.state.timeLeft);
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
