var React = require('react');


var Timer = React.createClass({
  propTypes: {
    timeDisplay: React.PropTypes.string.isRequired,
    handleTime: React.PropTypes.func.isRequired
  },

  handleSubmit: function(e){
    // manage button text
    // button could be Start, Reset, Break
    var myNode = document.getElementById("myButton").childNodes[0];
    var myLabel = myNode.nodeValue;

    if(myLabel == "Start")
    { myNode.nodeValue = "Reset"; }
    else
    { myNode.nodeValue = "Start"; }

    //manage time
    this.props.handleTime(myLabel);
  },

  render: function(){
    // console.log("Timer.render beg - timeLeft:", this.props.timeDisplay);
    return(
        <div>
            <kbd className="timeFormat">{this.props.timeDisplay}</kbd>
            <p/>
            <button type="button" className="btn btn-default btn-lg" id='myButton'
                onClick={this.handleSubmit}>Start</button>
        </div>
    )
  }
});

module.exports = Timer;
