// List of project stored in DB

import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectList extends Component {

  componentDidMount() {
    // when page render or re-render dispatch renders saga dispatch
    this.props.dispatch({ type:'FETCH_PROJECTS' });
  }

  render () {

    let list = this.props.reduxState.projectList.map( project => {
      return (
        <div key={project.id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
          <p>{project.thumbnail} <a href={project.github}>Github</a> </p>
        </div>
      )
    })

    return (
      <div>
        <h1>Project LIST</h1>
        { list }
      </div>
    )
  }
}

const mapStateToProps = reduxState => ({
  // getting data from reducer "projectList" that is contain in the redux store
  reduxState
});


export default connect(mapStateToProps)(ProjectList);