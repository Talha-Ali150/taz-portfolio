import React from 'react'
import Heading from '../Heading/Heading'
import ProjectsCard from './ProjectsCard'

const ProjectsSection = () => {
  return (
    <>
    <Heading heading={`PROJECTS`} />
    <div className='projectsSectionMainContainer'>
        <ProjectsCard />
    </div>
    </>
  )
}

export default ProjectsSection