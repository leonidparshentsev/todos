import { usePopups } from "../../contexts/PopupsContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useTaskContext } from "../../contexts/TaskContext";
import styles from "./TaskPopup.module.css"

export default function TaskPopup({
    taskInputValue,
    setTaskInputValue,
    targetGroupId,
    setTargetGroupId }) {

    const { taskPopupRef, setAddTaskPopupVisible } = usePopups();
    const { activeProject } = useProjectContext();
    const { addTaskHandler } = useTaskContext();

    return (<div className={styles.popup_container}>
        <div
            className={styles.popup}
            ref={taskPopupRef}>
            <label className={styles.popup__label} htmlFor="taskName">Type a name:</label>
            <input
                type="text"
                id="taskName"
                name="taskName"
                tabIndex={0}
                autoComplete="off"
                autoFocus value={taskInputValue}
                className={styles.popup__input}
                onChange={(e) => setTaskInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                        if(taskInputValue) addTaskHandler(targetGroupId, taskInputValue);
                        else setAddTaskPopupVisible(false);
                    } 
                }}/>
            <label className={styles.popup__label} htmlFor="groupName">Choose a group:</label>
            <select 
                id="groupName"
                name="groupName"
                tabIndex={0}
                value={targetGroupId}
                onChange={(e) => { setTargetGroupId(Number(e.target.value)) }}
                className={`${styles.popup__input} ${styles.popup__select}`} >
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
                    onClick={() => addTaskHandler(targetGroupId, taskInputValue)}>
                    Add new
                </button>
                <button
                    className={styles.popup__button}
                    onClick={() => setAddTaskPopupVisible(false)} >
                    Cancel
                </button>
            </div>
        </div>
    </div>)
}