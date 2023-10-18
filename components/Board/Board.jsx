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
        taskPopupRef,
        groupPopupRef
    }) {
    const [taskInputValue, setTaskInputValue] = useState('');
    const [targetGroupId, setTargetGroupId] = useState(1);

    const hideTaskPopupHandle = () => {
        setAddTaskPopupVisible(false);
        setTaskInputValue('');
    };

    // Добавляем обновленную группу с новой задачей в список групп текущего проекта. Передаем в updateProject обновленный объект текущего проекта.
    const addTaskHandler = (groupId, newTaskName) => {
        let newGroups = activeProject.groups.map( group => {
            if(group.id === groupId) {
                group = {...group, 
                    tasks: [...group.tasks, {id: group.tasks.length + 1, taskTitle: newTaskName}]
                };
            }
            return group;
        });
        updateProject({...activeProject, groups: newGroups});
        hideTaskPopupHandle();
    };

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
        let ask = confirm('Are you sure?');
        if(!ask) return;
        let newGroups = activeProject.groups.map( group => {
            if(group.id === groupId) {
                group = {...group, 
                    tasks: [...group.tasks.filter((item) => item.id !== taskId)]
                };
            }
            return group;
        });
        updateProject({...activeProject, groups: newGroups});
    };

    const addGroup = (groupName) => {
        if(groupName) {
            let id = activeProject.groups.length + 1;
            updateProject({...activeProject, groups: [...activeProject.groups, {id, groupTitle: groupName, tasks: []} ]});
        }
    };

    const editGroup = (groupName, groupId) => {
        if(groupName) {
            updateProject({...activeProject, groups: [...activeProject.groups.map((group) => {
                if(group.id === groupId) return {...group, groupTitle: groupName}
                else return group;
            })]});
        }
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
            <Header activeProject = {activeProject} 
            setAddTaskPopupVisible = {setAddTaskPopupVisible} />

            <TaskBoard activeProject={activeProject} 
            setAddTaskPopupVisible = {setAddTaskPopupVisible}
            setTargetGroupId = {setTargetGroupId} 
            editTaskName = {editTaskName}
            removeTask = {removeTask}
            addGroup = {addGroup}
            editGroup = {editGroup}
            removeGroup = {removeGroup}
            addGroupPopupVisible = {addGroupPopupVisible}
            setAddGroupPopupVisible = {setAddGroupPopupVisible}
            groupPopupRef = {groupPopupRef} />

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