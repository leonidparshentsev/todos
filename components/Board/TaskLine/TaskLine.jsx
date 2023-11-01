import { useMemo, useRef, useState } from "react";
import Task from "../Task/Task"
import GroupPopup from "../GroupPopup/GroupPopup"
import styles from "./TaskLine.module.css"
import { useTaskContext } from "../../contexts/TaskContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import TaskLineHeader from "../TaskLineHeader/TaskLineHeader";
import useHover from "../../../hooks/useHover";
import TaskPopup from "../TaskPopup/TaskPopup";
import { colorStyle } from "../../../utils/colorStyle";

export default function TaskLine({
    group,

    isNewGroupLine,
    dragTaskObj,
    setDragTaskObj
    }) {
    
    const { activeProject } = useProjectContext();
    const { putDropableTaskInsideGroup } = useTaskContext();

    const [taskPopupVisible, setTaskPopupVisible] = useState(false);
    const [groupPopupVisible, setGroupPopupVisible] = useState(false);

    const [inputLeftSideCoord, setInputLeftSideCoord] = useState(5);

    const inlineStyle = useMemo(() => colorStyle(group?.colorId), [group?.colorId]);

    const lineHeaderRef = useRef(null);
    const headerRef = useRef(null);
    const isHovering = useHover(headerRef);

    const showNewGroupPopupHandler = (e) => {
        let inputBtnLeftCoord = e.target.getBoundingClientRect().left;
        let clientRightCoord = document.documentElement.clientWidth; 

        if(inputBtnLeftCoord + 240 > clientRightCoord) {
            setInputLeftSideCoord(clientRightCoord - 250);
        } else if(inputBtnLeftCoord - 120 < 220) {
            setInputLeftSideCoord(210);
        } else {
            setInputLeftSideCoord(inputBtnLeftCoord);
        }

        setGroupPopupVisible(true);
    }
    
    const dragOverHandler = (e) => {
        e.preventDefault();
        if(group.tasks.length === 0) lineHeaderRef.current.style.borderBottom = '2px solid #2483e2';
    }  

    const dragLeaveHandler = (e) => {
        lineHeaderRef.current.style.borderBottom = 'none';
    } 

    const dropHandler = (e) => {
        e.preventDefault();
        lineHeaderRef.current.style.borderBottom = 'none';
        putDropableTaskInsideGroup('no tasks', group.id, dragTaskObj);
    }

    return (
        <>
            {!isNewGroupLine
                ? (<div
                    className={styles.task_line__container}
                    style={inlineStyle.container}
                    ref={headerRef}

                    onDragOver={dragOverHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragEnd={dragLeaveHandler}
                    onDrop={dropHandler}
                    >
                    <TaskLineHeader
                        group={group}
                        style={inlineStyle}
                        lineHeaderRef={lineHeaderRef}
                        showNewGroupPopupHandler={showNewGroupPopupHandler}
                        isHovering={isHovering}
                    />
                    {
                        group.tasks.map((task) =>
                            <Task
                                key={`${activeProject.id}-${group.id}-${task.id}`}
                                title={task.taskTitle}
                                taskId={task.id}
                                groupId={group.id}
                                dragTaskObj={dragTaskObj}
                                setDragTaskObj={setDragTaskObj}  
                            />)
                    }
                    <button
                        className={styles.task_line__button}
                        onClick={() => setTaskPopupVisible(true)}
                        style={inlineStyle.button}
                    >+ New task</button>
                </div>
                ) : (
                    <div className={styles.task_line__new_group}>
                        <button
                            onClick={showNewGroupPopupHandler}
                            className={styles.new_group__title}>
                            +
                        </button>
                    </div>
                )
            }

            {taskPopupVisible
                && <TaskPopup setVisible={setTaskPopupVisible} initialGroupId={group.id} />
            }
            {groupPopupVisible
                && (<GroupPopup
                    placeholder={group?.groupTitle ? group.groupTitle : 'New group'}
                    inputLeftSideCoord={inputLeftSideCoord}
                    groupId={group?.id}
                    setVisible={setGroupPopupVisible} 
                    />
                )
            }
        </>
    )
   
}