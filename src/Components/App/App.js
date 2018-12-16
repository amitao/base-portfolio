import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import ProjectsMain from '../Projects/ProjectsMain';
import ProjectsForm from '../Admin/ProjectForm';
import { HashRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          {/* links to url /admin */}
          <Route path='/' exact component={ProjectsMain} />
          <Route path='/admin' component={ProjectsForm} />

        </div>
      </Router>
    );
  }
}

export default App;
