import styles from "./Task.module.css"

export default function Task({title}) {
    
    return (
        <div className={styles.task_container}>
            <h3 className={styles.task__title} >{title}</h3>
        </div>
    )
}