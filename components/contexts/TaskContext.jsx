import { createContext, useContext } from "react";
import { useProjectContext } from "./ProjectContext";

const TaskContext = createContext();

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskContextProvider = ({ children }) => {

    const { activeProject, updateProject } = useProjectContext();

    // Добавляем обновленную группу с новой задачей в список групп текущего проекта. Передаем в updateProject обновленный объект текущего проекта.
    const addTaskHandler = (groupId, newTaskName) => {
        if(newTaskName) {
            let newGroups = activeProject.groups.map( group => {
                if(group.id === groupId) {

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
        // setAddTaskPopupVisible(false);
    };

    const putDropableTaskInsideGroup = (currentTaskId, currentGroupId, dragTaskObj) => {

        let newGroupsList = removeTask(dragTaskObj.groupId, dragTaskObj.taskId);

        // в случае, если перетягиваемый элемент дропается в зону контейнера задач TaskLine, а не конкретную задачу
        if(currentTaskId === 'no tasks') {
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

    return (
        <TaskContext.Provider value={{   
            addTaskHandler,
            putDropableTaskInsideGroup,
            editTaskName,
            removeTask }}>
            { children }
        </TaskContext.Provider>
    )
}