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
      let currentProject;

      if(activeProject) {
        currentProject = {...projects.find(project => project.id === activeProject.id)};
      } 

      // Проверяем существование текущего проекта в обновленном массиве, если существует обновляем состояние. Если нет - проверяем, остались ли вообще проекты ? выбираем первый : отдаем null
      if(currentProject && currentProject.id) {
        setActiveProject(currentProject);
      } else {
        if(projects.length > 0) setActiveProject(projects[0]);
        else setActiveProject(null);
      }
    
    }, [projects])
    
    const taskPopupRef = useRef(null);
    const groupPopupRef = useRef(null);

    const addProject = (newTitle) => {
      let id = projects.length + 1;
      setProjects([...projects, { id, projectTitle: newTitle, groups: [] }]);
    }

    const editProjectTitle = (newTitle, projectId) => {
      setProjects(projects.map(project => {
        if(project.id === projectId) return {...project, projectTitle: newTitle};
        else return project;
      }));
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
          activeProject={activeProject}
          addProject={addProject}
          editProjectTitle={editProjectTitle}
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