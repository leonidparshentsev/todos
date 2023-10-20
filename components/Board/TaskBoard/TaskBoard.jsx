import { useState } from "react";
import TaskLine from "../TaskLine/TaskLine"
import styles from "./TaskBoard.module.css"

export default function TaskBoard({
    activeProject, 

    setAddTaskPopupVisible, 
    setTargetGroupId, 

    putDropableTaskInsideGroup,
    editTaskName,
    removeTask,

    addGroupPopupVisible,
    setAddGroupPopupVisible,
    colorsPopupVisible,
    setColorsPopupVisible,

    addGroup,
    editGroupName,
    editGroupColor,
    removeGroup,

    groupPopupRef,
    colorsPopupRef
    }) {

    const [dragTaskObj, setDragTaskObj] = useState(null);
    
    return ( activeProject ?
        (<div className={styles.board_container}>
            {  (activeProject.groups
                    .map((group) =>
                        <TaskLine
                            key={group.id}
                            title={group.groupTitle}
                            tasks={group.tasks}

                            groupColorId={group.colorId}
                            projectId={activeProject.id}
                            groupId={group.id}

                            setAddTaskPopupVisible={setAddTaskPopupVisible}
                            setTargetGroupId={setTargetGroupId}

                            putDropableTaskInsideGroup={putDropableTaskInsideGroup}
                            editTaskName={editTaskName}
                            removeTask={removeTask}

                            editGroupName={editGroupName}
                            editGroupColor={editGroupColor}
                            removeGroup={removeGroup}

                            addGroupPopupVisible={addGroupPopupVisible}
                            setAddGroupPopupVisible={setAddGroupPopupVisible}

                            colorsPopupVisible = {colorsPopupVisible}
                            setColorsPopupVisible = {setColorsPopupVisible}

                            groupPopupRef = {groupPopupRef}
                            colorsPopupRef = {colorsPopupRef}

                            dragTaskObj={dragTaskObj}
                            setDragTaskObj={setDragTaskObj}
                 />))
            }
            <TaskLine 
                title='+'
                tasks={null}
                projectId={activeProject ? activeProject.id : 0}
                groupId={0}
                key={0}
                isNewGroupLine
                addGroup={addGroup}
                addGroupPopupVisible={addGroupPopupVisible}
                setAddGroupPopupVisible={setAddGroupPopupVisible}
                groupPopupRef = {groupPopupRef} 
                />
        </div>) : (
            <div className={styles.board__no_tasks}>Let`s create a new project</div>
        )
    )
}