import MenuItem from "../MenuItem/MenuItem";
import styles from "./Menu.module.css";

export default function Menu({
        projects, 
        activeProjectId,
        
        editProjectTitle,
        removeProject,
        openProjectBoard,

        projectPopupVisible,
        setProjectPopupVisible}) {
    return (
        <ul className={styles.list_menu}>
            {projects && projects.map(({ projectTitle, id }) =>
                <MenuItem
                    key={id}    
                    title={projectTitle}
                    projectId={id} 
                    activeProjectId = {activeProjectId}

                    editProjectTitle={editProjectTitle}
                    removeProject = {removeProject}
                    openProjectBoard={openProjectBoard}
                                        
                    projectPopupVisible={projectPopupVisible}
                    setProjectPopupVisible={setProjectPopupVisible} />
            )}
        </ul>
    );
}