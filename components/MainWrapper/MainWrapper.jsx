import { useEffect, useState } from 'react';
import styles from './MainWrapper.module.css'

import Aside from '../Aside/Aside';
import Board from '../Board/Board';
import tasksData from '../../public/tasksData';

export default function MainWrapper() {
    const [projects, setProjects] = useState(tasksData);
    const [activeProject, setActiveProject] = useState(projects[0].id); 

    const addProject = (newTitle) => {
      let id = projects.length + 1;
      setProjects([...projects, { id, projectTitle: newTitle, groups: [] }]);
    }

    // Обновляем состояние текущего списка проектов, добавив в него измененный проект с новой задачей / группой задач.
    const addTask = (updatedProjectObj) => {
      let newProject = projects.map((project) => {
        if(project.id === updatedProjectObj.id) project = {...updatedProjectObj};
        return project;
      });
      setProjects([...newProject]);
    }
   
    const openProjectBoard = (projectId) => {
      setActiveProject(projectId);
    };

    return (
      <div className={styles.container}>
        <Aside 
        projects = {projects} 
        activeProject = {activeProject}
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