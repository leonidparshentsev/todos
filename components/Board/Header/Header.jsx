import { usePopups } from "../../contexts/PopupsContext"
import { useProjectContext } from "../../contexts/ProjectContext";
import styles from "./Header.module.css"

export default function Header() {

    const {setAddTaskPopupVisible} = usePopups();
    const {activeProject} = useProjectContext();
    
    return (
        <div className={styles.header_container}>
            <h2 className={styles.header_title}>{activeProject ? activeProject.projectTitle : 'Welcome page'}</h2>
            {activeProject && activeProject.groups.length > 0 && <button className={styles.button} onClick={() => setAddTaskPopupVisible(true)}>+ Add new task</button>}
        </div>
    )
}