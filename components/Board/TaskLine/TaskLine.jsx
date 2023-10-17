import { useEffect, useState } from "react";
import Task from "../Task/Task"
import GroupPopup from "../GroupPopup/GroupPopup"
import styles from "./TaskLine.module.css"

export default function TaskLine({
    title, 
    tasks, 
    projectId,
    groupId, 
    setAddTaskPopupVisible, 
    editTaskName,
    removeTask,
    setTargetGroupId,
    addGroupPopupVisible,
    setAddGroupPopupVisible,
    isNewGroupLine, 
    addGroup,
    editGroup,
    removeGroup,
    groupPopupRef
    }) {

    const [newGroupPopupInputValue, setNewGroupPopupInputValue] = useState('');
    const [inputRightSideCoord, setInputRightSideCoord] = useState(5);

    useEffect(() => {
        setNewGroupPopupInputValue('');
    }, [addGroupPopupVisible])

    const hideNewGroupPopup = () => {
        setAddGroupPopupVisible(false);
        setNewGroupPopupInputValue('');
    }

    const editGroupHandler = () => {
        editGroup(newGroupPopupInputValue, groupId);
        hideNewGroupPopup();
    }

    const addNewGroupHandler = () => {
        addGroup(newGroupPopupInputValue);
        hideNewGroupPopup();
    }

    const showNewTaskPopupHandle = () => {
        setAddTaskPopupVisible(true);
        setTargetGroupId(groupId);
    }

    const showNewGroupPopupHandle = (e) => {
        let inputBtnRightCoord = e.target.getBoundingClientRect().right;
        let clientRightCoord = document.documentElement.clientWidth;                

        if(clientRightCoord < inputBtnRightCoord) {
            setInputRightSideCoord(inputBtnRightCoord - clientRightCoord + 30);
        } else {
            setInputRightSideCoord(5);
        }

        setAddGroupPopupVisible(`${projectId}-${groupId}`);
    }

    return (!isNewGroupLine ? (
            <div className={styles.task_line__container}>
                <div className={styles.task_line__header}>
                    <div className={styles.task_line__title_container}
                        onClick={showNewGroupPopupHandle}
                    >
                        <h3 className={styles.task_line__title}>{title}</h3>
                        
                    </div>
                    <p className={styles.task_line__task_count}>{tasks.length}</p>
                    <div className={styles.task_line__group_options} >
                        <div className={`${styles.options}`}></div>
                        <div className={`${styles.options}`} onClick={() => removeGroup(groupId)}>X</div>
                    </div>
                </div>

                {addGroupPopupVisible === `${projectId}-${groupId}` && (<GroupPopup
                    placeholder = {title}
                    groupPopupRef={groupPopupRef}
                    inputRightSideCoord={inputRightSideCoord}
                    setNewGroupPopupInputValue={setNewGroupPopupInputValue}
                    editGroupHandler={editGroupHandler}
                    setAddGroupPopupVisible={setAddGroupPopupVisible} />
                )}
                
                {
                    tasks.map((task) =>
                        <Task
                            title={task.taskTitle}
                            groupId={groupId}
                            taskId={task.id}
                            editTaskName={editTaskName}
                            removeTask={removeTask}
                            key={`${projectId}-${groupId}-${task.id}`} />)
                }
                <button
                    className={styles.task_line__button}
                    onClick={showNewTaskPopupHandle}>+ New task</button>
            </div>
        ) : (addGroupPopupVisible !== `${projectId}-${groupId}` ? (
                <div className={styles.task_line__new_group}
                    onClick={showNewGroupPopupHandle} 
                >
                    <h3 className={styles.new_group__title}>{title}</h3>
                </div>
            ) : (<div className={styles.task_line__new_group}>
                    <h3 className={styles.new_group__title}>{title}</h3>
                    <GroupPopup
                        placeholder = 'New group'
                        groupPopupRef={groupPopupRef}
                        inputRightSideCoord={inputRightSideCoord}
                        setNewGroupPopupInputValue={setNewGroupPopupInputValue}
                        addNewGroupHandler={addNewGroupHandler}
                        setAddGroupPopupVisible={setAddGroupPopupVisible} />
                </div>
            )
        )
    )
}

