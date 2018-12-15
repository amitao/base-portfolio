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
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <ProjectsMain />
        <Router>
          {/* links to url /admin */}
          <Route path='/admin' component={ProjectsForm} />
        </Router>
      </div>
    );
  }
}

export default App;
