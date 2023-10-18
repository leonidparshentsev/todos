import TaskLine from "../TaskLine/TaskLine"
import styles from "./TaskBoard.module.css"

export default function TaskBoard({
    activeProject, 
    setAddTaskPopupVisible, 
    setTargetGroupId, 
    editTaskName,
    removeTask,
    addGroupPopupVisible,
    setAddGroupPopupVisible,
    addGroup,
    editGroup,
    removeGroup,
    groupPopupRef
    }) {
    
    return ( activeProject ?
        (<div className={styles.board_container}>
            {  (activeProject.groups
                    .map((group) =>
                        <TaskLine
                            title={group.groupTitle}
                            tasks={group.tasks}
                            projectId={activeProject.id}
                            key={group.id}
                            groupId={group.id}
                            setAddTaskPopupVisible={setAddTaskPopupVisible}
                            setTargetGroupId={setTargetGroupId}
                            editTaskName={editTaskName}
                            removeTask={removeTask}
                            editGroup={editGroup}
                            removeGroup={removeGroup}
                            addGroupPopupVisible={addGroupPopupVisible}
                            setAddGroupPopupVisible={setAddGroupPopupVisible}
                            groupPopupRef = {groupPopupRef}
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