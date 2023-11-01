import { useState } from "react";
import TaskLine from "../TaskLine/TaskLine"
import styles from "./TaskBoard.module.css"
import { useProjectContext } from "../../contexts/ProjectContext";

export default function TaskBoard() {

    const [dragTaskObj, setDragTaskObj] = useState(null);
    const {activeProject} = useProjectContext();

    if(!activeProject) return <div className={styles.board__no_tasks}>Let`s create a new project</div>
    
    return (
        <div className={styles.board_container}>
            {(activeProject.groups
                .map((group) =>
                    <TaskLine
                        key={group.id}
                        group = {group}

                        dragTaskObj={dragTaskObj}
                        setDragTaskObj={setDragTaskObj}
                    />))
            }
            <TaskLine
                key={0}
                isNewGroupLine
            />
        </div>)
}