import { useEffect, useState } from 'react';
import styles from './MainWrapper.module.css'

import Aside from '../Aside/Aside';
import Board from '../Board/Board';
import tasksData from '../../public/tasksData';

export default function MainWrapper() {
    const [projects, setProjects] = useState(tasksData);
    const [activeProject, setActiveProject] = useState(1); 

    const addProject = (newTitle) => {
      let id = projects.length + 1;
      setProjects([...projects, { id, projectTitle: newTitle, groups: [] }]);
    }

    // Обновляем состояние текущего проекта, добавив в него измененный проект с новой задачей.
    const addTask = (updatedProjectObj) => {
      let newProject = projects.map((project) => {
        if(project.id === updatedProjectObj.id) project = {...updatedProjectObj};
        return project;
      });
      console.log(newProject);
      setProjects([...newProject]);
    }
   
    const openProjectBoard = (projectId) => {
      setActiveProject(projectId);
    };

    return (
      <div className={styles.container}>
        <Aside 
        projects = {projects} 
        addProject = {addProject}
        openProjectBoard = {openProjectBoard} />
        <Board 
        activeProject = {projects.find(project => project.id === activeProject)} 
        setActiveProject = {setActiveProject}
        addTask = {addTask}
        />
      </div>
    );
  }