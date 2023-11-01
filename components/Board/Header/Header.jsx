import { useState } from "react";
import { useProjectContext } from "../../contexts/ProjectContext";
import TaskPopup from "../TaskPopup/TaskPopup";
import styles from "./Header.module.css"

export default function Header() {

    const [taskPopupVisible, setTaskPopupVisible] = useState(false);
    const {activeProject} = useProjectContext();
    
    return (
        <div className={styles.header_container}>
            <h2 className={styles.header_title}>
                {activeProject ? activeProject.projectTitle : 'Welcome page'}
            </h2>
            {activeProject 
                && activeProject.groups.length > 0 
                && <button 
                    className={styles.button} 
                    onClick={() => setTaskPopupVisible(true)}>+ Add new task
                    </button>
            }
            {taskPopupVisible && 
            <TaskPopup setVisible={setTaskPopupVisible} initialGroupId={1} />}
        </div>
    )
}