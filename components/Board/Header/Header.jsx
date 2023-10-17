import styles from "./Header.module.css"

export default function Header({title, setAddTaskPopupVisible}) {
    
    return (
        <div className={styles.header_container}>
            <h2 className={styles.header_title}>{title}</h2>
            <button className={styles.button} onClick={() => setAddTaskPopupVisible(true)}>+ Add new task</button>
        </div>
    )
}