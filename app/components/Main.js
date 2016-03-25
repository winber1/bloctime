var React = require('react');
var Profile = require('./Profile');
//var ReactDOM = require('react-dom')

var Main = React.createClass({
    render: function(){
        return (
          <div className='container'><Profile />
          </div>
        )
    }
});

module.exports = Main;
//ReactDOM.render(<Main />, document.getElementById('app'))
