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

    const { addTaskPopupVisible, hideActivePopups } = usePopups();

    useEffect(() => {
        if(addTaskPopupVisible === false) setTaskInputValue('');
    }, [addTaskPopupVisible]);

    return (
        <div className={styles.board_container}
            onClick={hideActivePopups}>
            <Header/>
            <TaskContextProvider>
                <GroupContextProvider>
                    <TaskBoard
                        setTargetGroupId={setTargetGroupId}/>
                </GroupContextProvider>
                {addTaskPopupVisible &&
                    <TaskPopup
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