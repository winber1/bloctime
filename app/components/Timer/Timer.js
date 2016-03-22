var React = require('react');


var Timer = React.createClass({
  propTypes: {
    timeDisplay: React.PropTypes.string.isRequired,
    handleTime: React.PropTypes.func.isRequired
  },

  handleSubmit: function(e){
    // manage button text
    // button could be Start, Reset, Break
    var myLabel = document.getElementById("myButton").childNodes[0].nodeValue;
    console.log("myLabel:", myLabel);

    if(myLabel == "Start")
    {
        document.getElementById("myButton").childNodes[0].nodeValue = "Reset";
    }

    //manage time
    this.props.handleTime(myLabel);
  },

  render: function(){
    return(
        <div>
            <h3> From Timer.js </h3>
            <p>Time started **{this.props.timeDisplay}** seconds ago.</p>
            <button type="button" className="btn" id='myButton'
                onClick={this.handleSubmit}>Start</button>
        </div>
    )
  }
});

module.exports = Timer;
