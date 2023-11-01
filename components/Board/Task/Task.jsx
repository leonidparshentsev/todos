import { memo, useRef, useState } from "react";
import styles from "./Task.module.css";
import TaskTextArea from "../TaskTextArea/TaskTextArea";
import { useTaskContext } from "../../contexts/TaskContext";
import ItemOptions from "../../Aside/ItemOptions/ItemOptions";

export default memo(function Task({
    title, 
    taskId, 
    groupId, 
    dragTaskObj,
    setDragTaskObj}) {

const [editTaskInputVisible, setEditTaskInputVisible ] = useState(false);
const [taskTitle, setTaskTitle] = useState(title);   
const [textAreaHeight, setTextAreaHeight] = useState('auto');

const { putDropableTaskInsideGroup, editTaskName, removeTask } = useTaskContext();

const taskContainer = useRef(null);

const removeTaskHandler = () => {
    let ask = confirm('Are you sure?');
    if(!ask) return;
    removeTask(groupId, taskId);
}

const showEditTaskPopupHandler = () => {
    setEditTaskInputVisible(true);
}

const hideEditTaskPopupHandler = () => {
    setEditTaskInputVisible(false);
    editTaskName(groupId, taskId, taskTitle);
}

const dragStartHandler = (taskId, groupId, title) => {
    setDragTaskObj({taskId, groupId, title});
}

const dragOverHandler = (e) => {
    e.preventDefault();
    if(taskContainer.current && taskContainer.current.contains(e.target)) taskContainer.current.style.borderBottom = '2px solid #2483e2';
}  

const dragLeaveHandler = (e) => {
    taskContainer.current.style.borderBottom = 'none';
} 

const dropHandler = (e, currentTaskId, currentGroupId, dragTaskObj) => {
    e.preventDefault();
    e.stopPropagation();
    taskContainer.current.style.borderBottom = 'none';
    putDropableTaskInsideGroup(currentTaskId, currentGroupId, dragTaskObj);
}   

return (
    <div className={styles.task_container} 
        draggable={true}
        
        onDragStart={() => dragStartHandler(taskId, groupId, title)}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDragEnd={dragLeaveHandler}
        onDrop={(e) => dropHandler(e, taskId, groupId, dragTaskObj)}
        ref={taskContainer}
        >
        { editTaskInputVisible ? (
            <TaskTextArea 
                taskTitle = {taskTitle}
                setTaskTitle = {setTaskTitle}
                editTaskInputVisible = {editTaskInputVisible}
                hideEditTaskPopupHandler = {hideEditTaskPopupHandler}
                textAreaHeight = {textAreaHeight}
                setTextAreaHeight = {setTextAreaHeight} />
        ) : (
            <h3 className={styles.task__title}
                onDragOver={(e) => e.preventDefault()}
                style={{height: textAreaHeight}}>{taskTitle}</h3>
        )}
        <div className={styles.task__options}>
            <ItemOptions 
            editHandler={showEditTaskPopupHandler}
            removeHandler={removeTaskHandler} />
        </div>
    </div>
)
})