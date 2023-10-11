import TaskLine from "../TaskLine/TaskLine"
import styles from "./TaskBoard.module.css"

export default function TaskBoard({activeProject, setTaskPopupVisible, setTargetGroupId}) {
    
    return (
        <div className={styles.board_container}>
            {   
                activeProject.groups
                .map((group) => 
                    <TaskLine 
                    title = {group.groupTitle} 
                    tasks = {group.tasks} 
                    id = {group.id}
                    setTaskPopupVisible = {setTaskPopupVisible} 
                    setTargetGroupId = {setTargetGroupId}
                    key = {group.id} />)
            }
        </div>
    )
}