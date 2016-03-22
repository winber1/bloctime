var React = require('react');


var Timer = React.createClass({
  propTypes: {
    timeDisplay: React.PropTypes.string.isRequired,
    handleTime: React.PropTypes.func.isRequired
  },

  handleSubmit: function(){
    // manage button text
    // button could be Start, Reset, Break

    //manage time
    this.props.handleTime();
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
