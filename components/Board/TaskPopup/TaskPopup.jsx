import styles from "./TaskPopup.module.css"

export default function TaskPopup({
    taskPopupRef,
    taskInputValue,
    setTaskInputValue,
    targetGroupId,
    setTargetGroupId,
    activeProject,
    addTaskHandler,
    hideTaskPopupHandle }) {

    return (<div className={styles.popup_container}>
        <div
            className={styles.popup}
            ref={taskPopupRef}>
            <label className={styles.popup__label} htmlFor="taskName">Type a name:</label>
            <input
                type="text"
                name="taskName"
                tabIndex={0}
                autoComplete="off"
                autoFocus value={taskInputValue}
                className={styles.popup__input}
                onChange={(e) => setTaskInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                        if(taskInputValue) addTaskHandler(targetGroupId, taskInputValue);
                        else hideTaskPopupHandle();
                    } 
                }}/>
            <label className={styles.popup__label} htmlFor="groupName">Choose a group:</label>
            <select 
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
                    onClick={hideTaskPopupHandle} >
                    Cancel
                </button>
            </div>
        </div>
    </div>)
}