var React = require('react');


var Timer = React.createClass({
  propTypes: {
    timeLeft: React.PropTypes.number.isRequired,
    handleTime: React.PropTypes.func.isRequired
  },

  handleSubmit: function(){
    this.props.handleTime(this.props.timeLeft);
  },

  render: function(){
    return(
        <div>
            <h3> From Timer.js </h3>
            <p>Time started **{this.props.timeLeft}** seconds ago.</p>
            <button type="button" className="btn"
            // button could be Start, Reset, Break
                onClick={this.handleSubmit}>Start</button>
        </div>
    )
  }
});

module.exports = Timer;
