import { useState } from "react";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useTaskContext } from "../../contexts/TaskContext";
import styles from "./TaskPopup.module.css"

export default function TaskPopup({
    setVisible,
    initialGroupId,
    }) {

    const [taskValue, setTaskValue] = useState('');
    const [targetGroupId, setTargetGroupId] = useState(initialGroupId);

    const { activeProject } = useProjectContext();
    const { addTaskHandler } = useTaskContext();

    return (
    <div 
        className={styles.popup_container} 
        onClick={() => setVisible(false)}
    >
        <div
            className={styles.popup}
            onClick={e => e.stopPropagation()}
        >
            <label className={styles.popup__label} htmlFor="taskName">Type a name:</label>
            <input
                type="text"
                id="taskName"
                autoComplete="off"
                autoFocus value={taskValue}
                className={styles.popup__input}
                onChange={(e) => setTaskValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if(taskValue) addTaskHandler(targetGroupId, taskValue);
                        setVisible(false);
                    } 
                    if(e.key === 'Escape')  setVisible(false);
                }}/>
            <label className={styles.popup__label} htmlFor="groupName">Choose a group:</label>
            <select 
                id="groupName"
                value={targetGroupId}
                onChange={(e) => { setTargetGroupId(Number(e.target.value)) }}
                className={`${styles.popup__input} ${styles.popup__select}`} 
            >
                {
                    activeProject.groups.map( group =>
                        <option 
                            key={group.id}
                            value={group.id}>{group.groupTitle}</option>)
                }
            </select>
            <div className={styles.popup__buttons}>
                <button
                    className={styles.popup__button}
                    onClick={() => {
                        addTaskHandler(targetGroupId, taskValue);
                        setVisible(false);
                    }}
                >
                    Add new
                </button>
                <button
                    className={styles.popup__button}
                    onClick={() => setVisible(false)} 
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>)
}