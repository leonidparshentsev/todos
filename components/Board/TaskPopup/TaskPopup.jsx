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
                autoFocus value={taskInputValue}
                onChange={(e) => setTaskInputValue(e.target.value)}
                className={styles.popup__input}
                type="text"
                name="taskName"
                autoComplete="off"
            />
            <label
                className={styles.popup__label}
                htmlFor="groupName">
                Choose a group:
            </label>
            <select value={targetGroupId}
                name="groupName"
                onChange={(e) => { setTargetGroupId(Number(e.target.value)) }}
                className={styles.popup__input}>{
                    activeProject.groups.map(group =>
                        <option key={group.id}
                            value={group.id}>{group.groupTitle}</option>
                    )
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