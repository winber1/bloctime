var React = require('react');
var ReactDOM = require('react-dom')

var Main = React.createClass({
    render: function(){
        return (
          <div>Hello world</div>
        )
    }
});

//module.exports = Main;
ReactDOM.render(<Main />, document.getElementById('app'))
