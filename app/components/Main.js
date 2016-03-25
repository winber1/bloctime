var React = require('react');

var Main = React.createClass({
    render: function(){
        return (
          <div className="main-container">
            <div className="container">
              {this.props.children}
            </div>
          </div>
        )
    }
});

module.exports = Main;
