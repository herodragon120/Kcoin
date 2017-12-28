import React from 'react';
import Nav from 'Nav';
import HomePage from'HomePage'

class Main extends React.Component{
  render(){
    return (
      <div>
      <Nav/><HomePage/>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Main;
