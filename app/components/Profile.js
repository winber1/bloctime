var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var Timer = require('./Timer/Timer');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var buzz = require('buzz');


const WORKTIME = 10;      // sb 25 minutes
const BREAKTIME = 4;      // sb 5 minutes
const BREAKTIME_LONG = 12;   // sb 30 minutes
const WORK_SESSION_COUNT = 4;

var Main = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            timeLeft: WORKTIME,
            timeDisplay: this.timeFormat(WORKTIME),
            onBreak: false,
            workCount: 0,
            mySound: new buzz.sound( "./assets/music/56895DING",
                                     { formats: [ "mp3" ], preload: true }),
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

    handleAddNote: function(newNote){
        this.ref.child(this.state.notes.length).set(newNote);
    },

    // manage time based on Timer.js button click
    handleTime: function(btnLabel)
    {
        // console.log("handleTime beg - timeLeft:", this.state.timeLeft);

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
        // console.log("handleTime end - timeLeft:", this.state.timeLeft);
    },

    // seconds countdown and display
    tick: function()
    {
        // console.log("tick beg - timeLeft:", this.state.timeLeft);

        // seconds countdown
        if(this.state.timeLeft >= 0)
        {
          if(this.state.timeLeft == 0)
          {
            // ding
            this.state.mySound.play();
            //this.setState({timeLeft: this.state.timeLeft});
          }

          var t = this.state.timeLeft;
          this.setState({timeLeft: t-1, timeDisplay: this.timeFormat(t)});

        }
        // out of seconds - (re)set onBreak and display
        // handle completed work session
        else
        {
            // toggle onBreak; set time interval
            if(this.state.onBreak)
            {
                this.setState({timeLeft: WORKTIME, onBreak: false, timeDisplay: this.timeFormat(WORKTIME)} );
            }
            else
            {
                // work enough sessions to get a longer break
                var wrkCnt = this.state.workCount + 1;
                var brkTm = BREAKTIME;
                if(wrkCnt == WORK_SESSION_COUNT)
                {
                    brkTm = BREAKTIME_LONG;
                    wrkCnt = 0;
                }

                this.setState({timeLeft: brkTm, onBreak: true, workCount: wrkCnt, timeDisplay: this.timeFormat(brkTm)} );
            }

            // set display props
            document.getElementById("myButton").childNodes[0].nodeValue = "Start";

            clearInterval(this.timer);
        }
        // console.log("tick end - timeLeft:", this.state.timeLeft);
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
       //console.log("render beg - timeLeft:", this.state.timeLeft);
       return(
           <div className='row' style={{ marginTop: 15}}>

             <div className='col-md-4 well well-sm' >
               <Notes
                  username={this.props.params.username}
                  notes={this.state.notes}
                  addNote={this.handleAddNote} />
             </div>

             <div className='col-md-8  timerDiv'>
                <Timer
                  timeDisplay={this.state.timeDisplay}
                  handleTime={this.handleTime} />
             </div>
         </div>

        )
   }
});

module.exports = Main;
