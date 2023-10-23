import { createContext, useContext } from "react";
import { useProjectContext } from "./ProjectContext";

const GroupContext = createContext();

export const useGroupContext = () => {
    return useContext(GroupContext);
}

export const GroupContextProvider = ({ children }) => {

    const { activeProject, updateProject } = useProjectContext();

    const addGroup = (groupName) => {
        if(groupName) {
            let colorId = Math.floor(Math.random() * 9) + 1;
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
        <GroupContext.Provider value={{
            addGroup,
            editGroupName,
            editGroupColor,
            removeGroup }}
            >
            { children }
        </GroupContext.Provider>
    )
}