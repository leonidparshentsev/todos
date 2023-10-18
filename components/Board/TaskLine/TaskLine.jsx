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
        let inputBtnLeftCoord = e.target.getBoundingClientRect().left;
        let inputBtnSize = Math.floor(inputBtnRightCoord - inputBtnLeftCoord);
        let clientRightCoord = document.documentElement.clientWidth; 
        
        if(inputBtnLeftCoord < 240) {
            if(inputBtnSize === 40) setInputRightSideCoord(-200); 
            else setInputRightSideCoord(22)
        } else if(clientRightCoord < inputBtnRightCoord + 120) {

            if(inputBtnSize === 40) setInputRightSideCoord(inputBtnRightCoord - clientRightCoord + 20);
            else setInputRightSideCoord((inputBtnRightCoord + 120) - clientRightCoord + 100);
            
        } else {
            if(inputBtnSize === 40) setInputRightSideCoord(-120)
            else setInputRightSideCoord(120)
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
                        <div className={`${styles.options}`}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Menu / More_Horizontal">
                                <g id="Vector">
                                <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                </g>
                            </svg>
                        </div>
                        <div className={`${styles.options}`} onClick={() => removeGroup(groupId)}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Interface / Trash_Full">
                                <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </div>
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
                <div 
                    className={styles.task_line__new_group}
                    onClick={showNewGroupPopupHandle} 
                >
                    <h3 className={styles.new_group__title} 
                        tabIndex={0} 
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') showNewGroupPopupHandle(e);
                        }}>{title}</h3>
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

