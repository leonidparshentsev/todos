import { useEffect, useState } from "react";
import Task from "../Task/Task"
import styles from "./TaskLine.module.css"

export default function TaskLine({title, tasks, id, setTaskPopupVisible, setTargetGroupId}) {

    const [taskList, setTaskList] = useState(tasks);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks])

    const showPopupHandle = () => {
        setTaskPopupVisible(true);
        setTargetGroupId(id);
    }

    return (
        <div className={styles.task_line_container}>
            <h3 className={styles.task_line__title}>{title}</h3>
            {
            taskList.map((task) => <Task title={task.taskTitle} key={task.id}/>)
            }
            <button className={styles.button} onClick={showPopupHandle}>+ Add task</button>
        </div>
    )
}