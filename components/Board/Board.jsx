import { useState } from "react";

import Header from "./Header/Header"
import TaskBoard from "./TaskBoard/taskBoard"
import styles from "./Board.module.css"

export default function Board({activeProject, setActiveProject, addTask}) {
    const [taskPopupVisible, setTaskPopupVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [targetGroupId, setTargetGroupId] = useState(1);

    // Добавляем обновленную группу с новой задачей в список групп текущего проекта. Передаем в addTask обновленный объект текущего проекта.
    const addTaskHandle = () => {

        let newGroups = activeProject.groups.map( group => {
            if(group.id === targetGroupId) {
                group = {...group, 
                    tasks: [...group.tasks, {id: group.tasks.length + 1, taskTitle: inputValue}]
                };
            }
            return group;
        });
        addTask({...activeProject, groups: newGroups});
        hideTaskPopupHandle();
    }

    const addGroupHandle = () => {
        let newGroup = prompt('Type a group name...');
        let id = activeProject.groups.length + 1;
        addTask({...activeProject, groups: [...activeProject.groups, {id, groupTitle: newGroup, tasks: []} ]});
    }

    const hideTaskPopupHandle = () => {
        setTaskPopupVisible(false);
        setInputValue('');
    };

    return (
        <div className={styles.board_container}>
            <Header title = {activeProject.projectTitle} 
            setTaskPopupVisible = {setTaskPopupVisible} />

            <TaskBoard activeProject={activeProject} 
            setTaskPopupVisible = {setTaskPopupVisible}
            setTargetGroupId = {setTargetGroupId} 
            addGroupHandle = {addGroupHandle} />

            {taskPopupVisible &&
                (<div className={styles.popup_container}>
                    <div className={styles.popup}>
                        <label className={styles.popup__label} htmlFor="taskName">Type a name:</label>
                        <input autoFocus value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
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
                            onChange={(e) => {
                                setTargetGroupId(Number(e.target.value))
                                console.log(e.target.value);
                            }}
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
                                onClick={addTaskHandle}>
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
        </div>
    )
}