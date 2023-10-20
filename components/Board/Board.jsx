import { useState } from "react";

import Header from "./Header/Header"
import TaskBoard from "./TaskBoard/TaskBoard"
import TaskPopup from "./TaskPopup/TaskPopup";
import styles from "./Board.module.css"

export default function Board({
        activeProject,
        updateProject,
        addGroupPopupVisible,
        setAddGroupPopupVisible,
        addTaskPopupVisible, 
        setAddTaskPopupVisible,
        colorsPopupVisible,
        setColorsPopupVisible,
        taskPopupRef,
        groupPopupRef,
        colorsPopupRef
    }) {
    const [taskInputValue, setTaskInputValue] = useState('');
    const [targetGroupId, setTargetGroupId] = useState(1);

    const hideTaskPopupHandle = () => {
        setAddTaskPopupVisible(false);
        setTaskInputValue('');
    };

    // Добавляем обновленную группу с новой задачей в список групп текущего проекта. Передаем в updateProject обновленный объект текущего проекта.
    const addTaskHandler = (groupId, newTaskName) => {
        if(newTaskName) {
            let newGroups = activeProject.groups.map( group => {
                if(group.id === groupId) {
                    // let newId = group.tasks.length > 0 ? (group.tasks[group.tasks.length - 1].id + 1) : 1;
                    let tasks = group.tasks;
                    let newId = 1;

                    if(tasks.length > 0) newId = tasks.reduce((max, task) => max = Math.max(max, +task.id), 0) + 1;

                    group = {...group, 
                        tasks: [...group.tasks, {id: newId, taskTitle: newTaskName}]
                    };
                }
                return group;
            });
            updateProject({...activeProject, groups: newGroups});
        }
        hideTaskPopupHandle();
    };

    const putDropableTaskInsideGroup = (currentTaskId, currentGroupId, dragTaskObj) => {

        let newGroupsList = removeTask(dragTaskObj.groupId, dragTaskObj.taskId);

        if(currentTaskId === '-1') {
            newGroupsList = newGroupsList.map( group => {
                if(group.id === currentGroupId) {
                    let tasks = group.tasks;
                    let newId = 1;

                    if(tasks.length > 0) newId = tasks.reduce((max, task) => max = Math.max(max, +task.id), 0) + 1;
                    
                    tasks.push({id: newId, taskTitle: dragTaskObj.title});
        
                    group = {...group, tasks: [...tasks]};
                }
                return group;
            })
        } else {

            let newId = dragTaskObj.taskId;
            if (currentGroupId !== dragTaskObj.groupId) {
                let currentGroup = activeProject.groups.find(group => group.id === currentGroupId);
                newId = currentGroup.tasks.reduce((max, task) => max = Math.max(max, +task.id), 0) + 1;
            }

            newGroupsList = newGroupsList.map(group => {
                if (group.id === currentGroupId) {
                    let tasks = group.tasks;

                    let currentTaskIndex = tasks.indexOf(tasks.find(task => task.id === currentTaskId));
                    tasks.splice(currentTaskIndex + 1, 0, { id: newId, taskTitle: dragTaskObj.title });

                    group = { ...group, tasks: [...tasks] };
                }
                return group;
            })
        }

        updateProject({...activeProject, groups: newGroupsList});
    }

    const editTaskName = (groupId, taskId, newName) => {
        if(!newName) return;

        let newGroups = activeProject.groups.map( group => {
            if(group.id === groupId) {
                group = {...group, 
                    tasks: [...group.tasks.map((item) => item.id === taskId ? {...item, taskTitle: newName} : item)]
                };
            }
            return group;
        });
        updateProject({...activeProject, groups: newGroups});
    };

    const removeTask = (groupId, taskId) => {
        let newGroups = activeProject.groups.map( group => {
            if(group.id === groupId) {
                group = {...group, 
                    tasks: [...group.tasks.filter((item) => item.id !== taskId)]
                };
            }
            return group;
        });
        updateProject({...activeProject, groups: newGroups});
        return newGroups;
    };

    const addGroup = (groupName) => {
        if(groupName) {
            let colorId = Math.floor(Math.random() * 10) + 1;
            let id =  activeProject.groups.length > 0 ? (activeProject.groups[activeProject.groups.length - 1].id + 1) : 1
            updateProject({...activeProject, groups: [...activeProject.groups, {id, groupTitle: groupName, colorId: colorId, tasks: []} ]});
        }
    };

    const editGroupName = (groupName, groupId) => {
        if(groupName) {
            updateProject({...activeProject, groups: [...activeProject.groups.map((group) => {
                if(group.id === groupId) return {...group, groupTitle: groupName}
                else return group;
            })]});
        }
    };

    const editGroupColor = (groupColorId, groupId) => {
        updateProject({...activeProject, groups: [...activeProject.groups.map((group) => {
            if(group.id === groupId) return {...group, colorId: groupColorId}
            else return group;
        })]});
    };

    const removeGroup = (groupId) => {
        let ask = confirm('Are you sure?');
        if(!ask) return;
        updateProject({
            ...activeProject, groups: [...activeProject.groups.filter((group) => {
                if (group.id !== groupId) return group;
            })]
        });
    };

    return (
        <div className={styles.board_container}>
            <Header 
                activeProject = {activeProject} 
                setAddTaskPopupVisible = {setAddTaskPopupVisible} />

            <TaskBoard 
                activeProject={activeProject} 

                setAddTaskPopupVisible = {setAddTaskPopupVisible}
                setTargetGroupId = {setTargetGroupId} 
                
                putDropableTaskInsideGroup={putDropableTaskInsideGroup}
                editTaskName = {editTaskName}
                removeTask = {removeTask}
                addGroup = {addGroup}
                editGroupName = {editGroupName}
                editGroupColor = {editGroupColor}
                removeGroup = {removeGroup}

                addGroupPopupVisible = {addGroupPopupVisible}
                setAddGroupPopupVisible = {setAddGroupPopupVisible}

                colorsPopupVisible = {colorsPopupVisible}
                setColorsPopupVisible = {setColorsPopupVisible}

                groupPopupRef = {groupPopupRef}
                colorsPopupRef = {colorsPopupRef} />

            {addTaskPopupVisible && 
                <TaskPopup 
                    taskPopupRef = {taskPopupRef} 
                    taskInputValue = {taskInputValue} 
                    setTaskInputValue = {setTaskInputValue} 
                    targetGroupId = {targetGroupId} 
                    setTargetGroupId = {setTargetGroupId}
                    activeProject = {activeProject}
                    addTaskHandler = {addTaskHandler}
                    hideTaskPopupHandle = {hideTaskPopupHandle} />
            }
        </div>
    )
}