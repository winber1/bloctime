var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function(){
      return{
            notes: [1,2,3],
            bio: {
                name:'winnie e'
            },
            repos: ['a','b','c']
      }
    },
    // called bfr component mounts
    componentWillMount: function(){
      this.ref = new Firebase('https://bloctime-winber1.firebaseio.com/');
      var childRef = this.ref.child(this.props.params.username);
      this.bindAsArray(childRef, 'notes');
    },

    componentWillUnmount: function(){
      this.unbind('notes');
    },

    onChange: function(e) {
      this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var idx = this.state.notes.length - 1;
      var text = this.state.text;
      console.log("text:", this.state.text);
      this.ref.child(this.props.params.username).push({
          '$id':this.state.text
        });
      this.setState({ text: "" });
    },

    render: function(){
       return(
           <div className='row'>
             <div className='col-md-4'>
                <form onSubmit={ this.handleSubmit }>
                <input onChange={ this.onChange } value={ this.state.text } />
                <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
                </form>
             </div>

             <div className='col-md-4'>
               <UserProfile username={this.props.params.username} bio={this.state.bio} />
             </div>
             <div className='col-md-4'>
               <Repos username={this.props.params.username} repos={this.state.repos} />
             </div>
             <div className='col-md-4'>
               <Notes username={this.props.params.username} notes={this.state.notes} />
             </div>
           </div>
        )
   }
});

module.exports = Profile;
