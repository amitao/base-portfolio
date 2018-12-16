import React, {Component} from 'react';
import { connect } from 'react-redux';

class DisplayList extends Component {

  handleDelete = (id) => {
    console.log('Delete has been clicked:', id);
    this.props.dispatch({ type:'DELETE', payload: id })
  }


  render () {
  let list = this.props.projectList.map( item => {
    return (
      <div key={item.id}>
        <p>{item.name}</p>
        <button onClick={()=> this.handleDelete(item.id)}>DELETE</button>
      </div>
    )
  })

  return (
    <div>
      {list}
    </div>
  )
  }
}

const mapStateToProps = reduxState => ({
  projectList: reduxState.projectList
});


export default connect(mapStateToProps)(DisplayList);