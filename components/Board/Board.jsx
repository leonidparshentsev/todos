import { useEffect, useState } from "react";

import Header from "./Header/Header"
import TaskBoard from "./TaskBoard/TaskBoard"
import TaskPopup from "./TaskPopup/TaskPopup";
import styles from "./Board.module.css"

import { usePopups } from "../contexts/PopupsContext";
import { GroupContextProvider } from "../contexts/GroupContext";
import { TaskContextProvider } from "../contexts/TaskContext";

export default function Board() {

    const [taskInputValue, setTaskInputValue] = useState('');
    const [targetGroupId, setTargetGroupId] = useState(1);

    const {addTaskPopupVisible, setAddTaskPopupVisible} = usePopups();

    const hideTaskPopupHandler = () => {
        setAddTaskPopupVisible(false);
        setTaskInputValue('');
    };

    useEffect(() => {
        if(addTaskPopupVisible === false) setTaskInputValue('');
    }, [addTaskPopupVisible]);

    const { hideActivePopups } = usePopups();

    return (
        <div className={styles.board_container}
            onClick={hideActivePopups}>
            <Header/>
            <TaskContextProvider hideTaskPopupHandler={hideTaskPopupHandler}>
                <GroupContextProvider>
                    <TaskBoard
                        setTargetGroupId={setTargetGroupId}/>
                </GroupContextProvider>
                {addTaskPopupVisible &&
                    <TaskPopup
                        hideTaskPopupHandler={hideTaskPopupHandler}
                        taskInputValue={taskInputValue}
                        setTaskInputValue={setTaskInputValue}
                        targetGroupId={targetGroupId}
                        setTargetGroupId={setTargetGroupId}
                    />
                }
            </TaskContextProvider>
        </div>
    )
}