import { useEffect, useRef } from "react"
import styles from "./TaskTextArea.module.css"

export default function TaskTextArea({ 
    taskTitle,
    setTaskTitle,
    groupId,
    taskId,
    editTaskInputVisible,    
    hideEditTaskPopupHandler,
    textAreaHeight,
    setTextAreaHeight}) {

    const textAreaRef = useRef(null);

    useEffect(() => {
        if(editTaskInputVisible === `${groupId} ${taskId}`) {
            resizeTextarea();
            setFocus();
        } 
    }, [editTaskInputVisible]);

    const setFocus = () => {
        textAreaRef.current.setSelectionRange(taskTitle.length, taskTitle.length);
    }

    const resizeTextarea = () => {
        setTextAreaHeight("auto");
        textAreaRef.current.style.height = "auto";
        
        setTextAreaHeight(textAreaRef.current.scrollHeight + "px");
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }

    const textChangeHandler = (e) => {
        setTaskTitle(e.target.value);
        resizeTextarea();
    }

    return <textarea
        className={styles.task__textarea}
        style={{ height: textAreaHeight }}
        autoFocus
        rows={1}
        name="taskTitle"
        value={taskTitle}
        onBlur={() => {
            hideEditTaskPopupHandler();
            resizeTextarea();
        }}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') hideEditTaskPopupHandler();
            resizeTextarea();
        }}
        onChange={textChangeHandler}
        ref={textAreaRef} />
}