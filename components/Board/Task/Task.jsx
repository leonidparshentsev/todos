import styles from "./Task.module.css"

export default function Task({title}) {
    
    return (
        <div className={styles.task_container}>
            <h3>{title}</h3>
        </div>
    )
}