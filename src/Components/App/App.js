import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import ProjectsMain from '../Projects/ProjectsMain';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <ProjectsMain />
      </div>
    );
  }
}

export default App;
