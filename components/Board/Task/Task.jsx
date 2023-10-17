import { useState } from "react";
import styles from "./Task.module.css";
import TaskTextArea from "../TaskTextArea/TaskTextArea";

export default function Task({
        title, 
        taskId, 
        groupId, 
        editTaskName,
        removeTask}) {
    
    const [editTaskInputVisible, setEditTaskInputVisible ] = useState(false);
    const [taskTitle, setTaskTitle] = useState(title);   
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    const removeTaskHandler = () => {
        removeTask(groupId, taskId);
    }

    const showEditTaskPopupHandler = () => {
        setEditTaskInputVisible(`${groupId} ${taskId}`);
    }

    const hideEditTaskPopupHandler = () => {
        setEditTaskInputVisible('0');
        editTaskName(groupId, taskId, taskTitle);
    }
    
    return (
        <div className={styles.task_container}>
            { editTaskInputVisible === `${groupId} ${taskId}` ? (
                <TaskTextArea 
                taskTitle = {taskTitle}
                setTaskTitle = {setTaskTitle}
                groupId = {groupId}
                taskId = {taskId}
                editTaskInputVisible = {editTaskInputVisible}
                hideEditTaskPopupHandler = {hideEditTaskPopupHandler}
                textAreaHeight = {textAreaHeight}
                setTextAreaHeight = {setTextAreaHeight} />
            ) : (
                <h3 className={styles.task__title}
                style={{height: textAreaHeight}}>{taskTitle}</h3>
            )}
            <div className={styles.task__options}>
                <div className={`${styles.options}`} onClick={showEditTaskPopupHandler}>E</div>
                <div className={`${styles.options}`} onClick={removeTaskHandler}>X</div>
            </div>
        </div>
    )
}