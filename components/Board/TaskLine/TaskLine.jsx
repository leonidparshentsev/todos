import { useEffect, useRef, useState } from "react";
import Task from "../Task/Task"
import GroupPopup from "../GroupPopup/GroupPopup"
import styles from "./TaskLine.module.css"
import { usePopups } from "../../contexts/PopupsContext";
// import { useGroupContext } from "../../../contexts/GroupContext";
import { useGroupContext } from "../../contexts/GroupContext";
import { useTaskContext } from "../../contexts/TaskContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import TaskLineHeader from "../TaskLineHeader/TaskLineHeader";
import useHover from "../../../hooks/useHover";

export default function TaskLine({
    title, 
    tasks,
    groupId, 
    groupColorId,

    projectId,
    setTargetGroupId,

    isNewGroupLine,

    dragTaskObj,
    setDragTaskObj
    }) {

    const { addGroupPopupVisible, 
        setAddGroupPopupVisible,
        setColorsPopupVisible,
        setAddTaskPopupVisible } = usePopups();
    
    const { activeProject } = useProjectContext();
    const { addGroup, editGroupName, editGroupColor} = useGroupContext();
    const { putDropableTaskInsideGroup } = useTaskContext();

    const [newGroupPopupInputValue, setNewGroupPopupInputValue] = useState('');
    const [inputRightSideCoord, setInputRightSideCoord] = useState(5);
    const [colorId, setColorId] = useState(groupColorId);

    const newGroupBtnRef = useRef(null);
    const lineHeaderRef = useRef(null);

    const headerRef = useRef(null);
    const isHovering = useHover(headerRef);

    useEffect(() => {
        setColorId(groupColorId);
    }, [projectId, groupColorId]);

    useEffect(() => {
        setNewGroupPopupInputValue('');
    }, [addGroupPopupVisible]);

    useEffect(() => {
        setAddGroupPopupVisible(false);
    }, [activeProject]);

    const hideNewGroupPopup = () => {
        setAddGroupPopupVisible(false);
        setNewGroupPopupInputValue('');
    }

    const addNewGroupHandler = () => {
        addGroup(newGroupPopupInputValue);
        hideNewGroupPopup();
    }

    const editGroupNameHandler = () => {
        editGroupName(newGroupPopupInputValue, groupId);
        hideNewGroupPopup();
    }

    const editGroupColorHandler = (newColorId) => {
        editGroupColor(newColorId, groupId);
        setColorsPopupVisible(false);
    }

    const showNewTaskPopupHandler = () => {
        setAddTaskPopupVisible(true);
        setTargetGroupId(groupId);
    }

    const showNewGroupPopupHandler = (e) => {
        let inputBtnRightCoord = e.target.getBoundingClientRect().right;
        let inputBtnLeftCoord = e.target.getBoundingClientRect().left;
        let clientRightCoord = document.documentElement.clientWidth; 
        let newGroupBtn = newGroupBtnRef.current && newGroupBtnRef.current.contains(e.target);

        console.log(e.target);

        // отрабатываем левую сторону
        if(inputBtnLeftCoord < 360) {
            if(newGroupBtn) setInputRightSideCoord(-185); 
            else {
                if(inputBtnLeftCoord - 200 < 120) setInputRightSideCoord(inputBtnLeftCoord - 185)
                else setInputRightSideCoord(112);
            } 
        // отрабатываем правую сторону
        } else if(clientRightCoord < inputBtnRightCoord + 120) {
            if(newGroupBtn) setInputRightSideCoord(inputBtnRightCoord - clientRightCoord + 10);
            else setInputRightSideCoord((inputBtnRightCoord + 120) - clientRightCoord + 100);
        // общий случай
        } else {
            if(newGroupBtn) setInputRightSideCoord(-100)
            else setInputRightSideCoord(112)
        }

        setAddGroupPopupVisible(`${projectId}-${groupId}`);
    }

    const colors = {
        1: 'pink',
        2: 'brown',
        3: 'orange',
        4: 'gray',
        5: 'yellow',
        6: 'green',
        7: 'blue',
        8: 'purple',
        9: 'red',
    };

    const style = {
        'container': { backgroundColor: `var(--${colors[colorId]}_main)` },
        'title' : { backgroundColor: `var(--${colors[colorId]}_secondary)`, 
                    color: `var(--${colors[colorId]}_text_dark)`},
        'taskCount' : { color: `var(--${colors[colorId]}_text_light)`},
        'svgPath' : { stroke: `var(--${colors[colorId]}_text_light)`},
        'button' : { color: `var(--${colors[colorId]}_text_light)`}
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        if(tasks.length === 0) lineHeaderRef.current.style.borderBottom = '2px solid #2483e2';
    }  

    const dragLeaveHandler = (e) => {
        lineHeaderRef.current.style.borderBottom = 'none';
    } 

    const dropHandler = (e) => {
        e.preventDefault();
        lineHeaderRef.current.style.borderBottom = 'none';
        putDropableTaskInsideGroup('no tasks', groupId, dragTaskObj);
    }

    return (!isNewGroupLine ? (
        <div
            className={styles.task_line__container}
            style={style.container}
            ref={headerRef}

            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragLeaveHandler}
            onDrop={dropHandler}
        >
            <TaskLineHeader
                title={title}
                tasks={tasks}
                groupId={groupId}
                groupColorId={groupColorId}
                projectId={projectId}

                colors={colors}
                style={style}

                lineHeaderRef={lineHeaderRef}
                showNewGroupPopupHandler={showNewGroupPopupHandler}

                isHovering={isHovering}
                editGroupColorHandler={editGroupColorHandler}
            />
            {
                tasks.map((task) =>
                    <Task
                        title={task.taskTitle}
                        groupId={groupId}
                        taskId={task.id}

                        dragTaskObj={dragTaskObj}
                        setDragTaskObj={setDragTaskObj}
                        key={`${projectId}-${groupId}-${task.id}`} />)
            }
            <button
                className={styles.task_line__button}
                onClick={showNewTaskPopupHandler}
                style={style.button}>+ New task</button>

            {addGroupPopupVisible === `${projectId}-${groupId}`
                && (<GroupPopup
                    placeholder={title}

                    inputRightSideCoord={inputRightSideCoord}
                    setNewGroupPopupInputValue={setNewGroupPopupInputValue}
                    editGroupNameHandler={editGroupNameHandler}
                    setAddGroupPopupVisible={setAddGroupPopupVisible} />
                )}
        </div>
    ) : (
        <div
            className={styles.task_line__new_group}
            ref={newGroupBtnRef}>

            <button
                onClick={showNewGroupPopupHandler}
                className={styles.new_group__title}>
                +
            </button>

            {addGroupPopupVisible === `${projectId}-${groupId}` &&
                <GroupPopup
                    placeholder='New group'

                    inputRightSideCoord={inputRightSideCoord}
                    setNewGroupPopupInputValue={setNewGroupPopupInputValue}
                    addNewGroupHandler={addNewGroupHandler}
                    setAddGroupPopupVisible={setAddGroupPopupVisible} />}

        </div>
    )
    )
}