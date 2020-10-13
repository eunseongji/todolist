import React, { Component } from 'react';
import EditPage from './Components/EditPage';
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import Main from './Components/Main';

class App extends Component {

  render() {
    return (
      <BrowserRouter>  
        <Switch>
          <Route exact path = '/' component={Main}/>
          <Route path = '/EditPage' component={EditPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
