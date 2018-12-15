import React from 'react';
import ProjectList from './ProjectList';


// stateless functional component
const ProjectsMain = () => {
  return (
    <div>        
       <h1>Main Page for projects to load</h1>
       <ProjectList />
     </div>
  )
}


export default ProjectsMain;