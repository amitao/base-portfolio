// List of project stored in DB

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProjectList.css';

class ProjectList extends Component {

  componentDidMount() {
    // when page render or re-render dispatch renders saga dispatch
    this.props.dispatch({ type:'FETCH_PROJECTS' });
  }

  render () {
     // don't have to use -> this.props.redxState.<reducerName>.map(){}
     // this.props.projectList(comes from the )
    let list = this.props.projectList.map( project => {
      return (
        <div key={project.id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
          <p><img src={project.thumbnail} alt="images"/> </p>
          <p><a href={project.github}>Github</a> </p>
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
  projectList: reduxState.projectList
});


export default connect(mapStateToProps)(ProjectList);