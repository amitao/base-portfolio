// Admin page to add new projects and render on the component ProjectList
// new project should be able to store in DB
// needs form/input/button fields and tags

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayList from './DisplayList';


class ProjectFrom extends Component {


  state = {
    name: '',
    description: '', 
    github: '',
    date_completed: '',
    tag_id: ''
  }

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_PROJECTS'});
    this.props.dispatch({type: 'FETCH_TAGS'});
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

  handleClick = event => {
    event.preventDefault();
    console.log('add form:', this.state)
    this.props.dispatch({ type:'ADD_PROJECT', payload: this.state})
    this.setState({
      name: '',
      description: '', 
      github: '',
      date_completed: '',
      tag_id: ''
    });
  }


  render () {

    let tagId = this.props.tagList.map( (item, i)=> {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    })

    return (
      <div>
        <h1>this is ProjectForm</h1>
        <form>
          <input value={this.state.name} onChange={this.handleChange('name')} placeholder="name" type="text" />
          <input value={this.state.description} onChange={this.handleChange('description')} placeholder="description" type="text" />
          <input value={this.state.github} onChange={this.handleChange('github')} placeholder="github" type="text" />
          <input value={this.state.date_completed} onChange={this.handleChange('date_completed')} placeholder="date completed" type="date" />
            <select onChange={this.handleChange('tag_id')} value={this.state.tag_id} >
              {tagId}
            </select>
          <input type="submit" onClick={this.handleClick} value="Submit"/>
        </form>

        <DisplayList />
      </div>
    )
  }
}


const mapStateToProps = reduxState => ({
  tagList: reduxState.tagList
});

export default connect(mapStateToProps)(ProjectFrom);