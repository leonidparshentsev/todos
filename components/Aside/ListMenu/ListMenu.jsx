import ItemMenu from "../ItemMenu/ItemMenu";
import styles from "./ListMenu.module.css";

export default function ListMenu({projects, openProjectBoard, activeProject}) {
    return (
        <ul className={styles.list_menu}>
            {projects.map(({ projectTitle, id }) =>
                <ItemMenu
                    title={projectTitle}
                    key={id}
                    openProjectBoard={openProjectBoard}
                    id={id} 
                    activeProject = {activeProject} />
            )}
        </ul>
    );
}