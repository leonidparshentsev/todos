import ItemMenu from "../ItemMenu/ItemMenu";
import styles from "./ListMenu.module.css";

export default function ListMenu({
        projects, 
        activeProjectId,
        
        // addProject,
        editProjectTitle,
        removeProject,
        openProjectBoard,

        projectPopupVisible,
        setProjectPopupVisible}) {
    return (
        <ul className={styles.list_menu}>
            {projects && projects.map(({ projectTitle, id }) =>
                <ItemMenu
                    key={id}    
                    title={projectTitle}
                    projectId={id} 
                    activeProjectId = {activeProjectId}

                    // addProject={addProject}
                    editProjectTitle={editProjectTitle}
                    removeProject = {removeProject}
                    openProjectBoard={openProjectBoard}
                                        
                    projectPopupVisible={projectPopupVisible}
                    setProjectPopupVisible={setProjectPopupVisible} />
            )}
        </ul>
    );
}