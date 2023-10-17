import { useEffect, useRef, useState } from 'react';
import styles from './MainWrapper.module.css'

import Aside from '../Aside/Aside';
import Board from '../Board/Board';
import tasksData from '../../public/tasksData';

export default function MainWrapper() {
    const [addGroupPopupVisible, setAddGroupPopupVisible] = useState(false);
    const [addTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
    const [projects, setProjects] = useState(tasksData);
    const [activeProject, setActiveProject] = useState(projects[0]); 

    useEffect(() => {
      // setActiveProject({...projects.find(project => project.id === activeProject.id )});
      setActiveProject(projects[0]);
    }, [projects])
    
    const taskPopupRef = useRef(null);
    const groupPopupRef = useRef(null);

    const addProject = (newTitle) => {
      let id = projects.length + 1;
      setProjects([...projects, { id, projectTitle: newTitle, groups: [] }]);
    }

    const removeProject = (projectId) => {
      let ask = confirm('Are you sure?');
      if(!ask) return;
      
      setProjects(projects.filter(project => project.id !== projectId));
      if(activeProject.id === projectId) setActiveProject(projects[0]);
    }
    // Обновляем состояние текущего списка проектов, добавив в него измененный проект с новой задачей / группой задач.
    const updateProject = (updatedProjectObj) => {
      let newProjectsList = projects.map((project) => {
        if(project.id === updatedProjectObj.id) project = {...updatedProjectObj};
        return project;
      });
      setProjects([...newProjectsList]);
    }
   
    const openProjectBoard = (projectId) => {
      setActiveProject({...projects.find(project => project.id === projectId)})
    };

    const hideActivePopups = (e) => {
      if (taskPopupRef.current && 
        !taskPopupRef.current.contains(e.target)) setAddTaskPopupVisible(false);

      if (groupPopupRef.current && 
          !groupPopupRef.current.contains(e.target)) setAddGroupPopupVisible(false);
    }

    return (
      <div
        className={styles.container}
        onClick={hideActivePopups}>

        <Aside
          projects={projects}
          activeProjectId={activeProject.id}
          addProject={addProject}
          removeProject={removeProject}
          openProjectBoard={openProjectBoard} />

        <Board
          activeProject={activeProject}
          updateProject={updateProject}

          addGroupPopupVisible={addGroupPopupVisible}
          setAddGroupPopupVisible={setAddGroupPopupVisible}

          addTaskPopupVisible={addTaskPopupVisible}
          setAddTaskPopupVisible={setAddTaskPopupVisible}

          taskPopupRef = {taskPopupRef}
          groupPopupRef = {groupPopupRef}
        />
      </div>
    );
  }