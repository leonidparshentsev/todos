import ListMenu from "./ListMenu/ListMenu";
import Logo from "./Logo/Logo";
import ProjectPopup from "./ProjectPopup/ProjectPopup";
import styles from "./Aside.module.css"
import { useState } from "react";

export default function Aside({
        projects, 
        activeProject,
        addProject,
        editProjectTitle,
        removeProject, 
        openProjectBoard, }) {

    const [projectPopupVisible, setProjectPopupVisible] = useState(false);

    return (
        <aside className={styles.aside_container}>
            <Logo />
            <ListMenu 
                projects={projects} 
                activeProjectId = {activeProject ? activeProject.id : 0}
                
                addProject={addProject}
                editProjectTitle={editProjectTitle}
                removeProject = {removeProject}
                openProjectBoard = {openProjectBoard} 

                projectPopupVisible={projectPopupVisible}
                setProjectPopupVisible={setProjectPopupVisible} />
            {projectPopupVisible === 'new' ? (
                <ProjectPopup 
                    addProject={addProject}
                    setProjectPopupVisible={setProjectPopupVisible} />
                ) : (
                <button className={styles.aside__button} onClick={() => {
                    setProjectPopupVisible('new');
                }}>+ Add a project</button>
            )}
        </aside>
    )
}