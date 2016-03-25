var React = require('react');
var Home = require('./Home');
//var ReactDOM = require('react-dom')

var Main = React.createClass({
    render: function(){
        return (
          <div>Hello worldzz
          <Home />
          </div>

        )
    }
});

module.exports = Main;
//ReactDOM.render(<Main />, document.getElementById('app'))
