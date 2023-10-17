import ItemMenu from "../ItemMenu/ItemMenu";
import styles from "./ListMenu.module.css";

export default function ListMenu({
        projects, 
        openProjectBoard,
        removeProject, 
        activeProjectId}) {
    return (
        <ul className={styles.list_menu}>
            {projects.map(({ projectTitle, id }) =>
                <ItemMenu
                    title={projectTitle}
                    key={id}
                    openProjectBoard={openProjectBoard}
                    projectId={id} 
                    activeProjectId = {activeProjectId}
                    removeProject = {removeProject} />
            )}
        </ul>
    );
}