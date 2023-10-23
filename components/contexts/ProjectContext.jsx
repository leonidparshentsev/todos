import { createContext, useContext, useState, useRef, useEffect } from "react";
import tasksData from '../../public/DB.json';

const ProjectContext = createContext();

export const useProjectContext = () => {
    return useContext(ProjectContext);
}

export const ProjectContextProvider = ({ children }) => {

  const [projects, setProjects] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('db')) localStorage.setItem('db', JSON.stringify(tasksData.DB));
    
    setProjects(JSON.parse(localStorage.getItem('db')));
  }, []);

  useEffect(() => {
    let currentProject;

    if (activeProject) {
      currentProject = { ...projects.find(project => project.id === activeProject.id) };
    }

    if (currentProject && currentProject.id) {
      setActiveProject(currentProject);
    } else {
      if (projects && projects.length > 0) setActiveProject(projects[0]);
      else setActiveProject(null);
    }

    if(projects !== 'null') localStorage.setItem('db', JSON.stringify(projects));

  }, [projects]);

  const addProject = (newTitle) => {
    let id = projects.reduce((max, project) => max = Math.max(max, +project.id), 0) + 1;
    let newProject =  { id, projectTitle: newTitle, groups: [] };
    setProjects([...projects, newProject]);
    setActiveProject(newProject);
  };

  const editProjectTitle = (newTitle, projectId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) return { ...project, projectTitle: newTitle };
      else return project;
    }));
  };

  const removeProject = (projectId) => {
    let ask = confirm('Are you sure?');
    if (!ask) return;

    setProjects(projects.filter(project => project.id !== projectId));
    if (activeProject.id === projectId) setActiveProject(projects[0]);
  };
  // Обновляем состояние текущего списка проектов, добавив в него измененный проект с новой задачей / группой задач.
  const updateProject = (updatedProjectObj) => {
    let newProjectsList = projects.map((project) => {
      if (project.id === updatedProjectObj.id) project = { ...updatedProjectObj };
      return project;
    });
    setProjects([...newProjectsList]);
  };

  const openProjectBoard = (projectId) => {
    setActiveProject({ ...projects.find(project => project.id === projectId) })
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      activeProject,
      addProject,
      editProjectTitle,
      removeProject,
      updateProject,
      openProjectBoard
    }}>
      {children}
    </ProjectContext.Provider>
  )
}