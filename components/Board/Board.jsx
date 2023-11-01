import Header from "./Header/Header"
import TaskBoard from "./TaskBoard/TaskBoard"
import styles from "./Board.module.css"

import { GroupContextProvider } from "../contexts/GroupContext";
import { TaskContextProvider } from "../contexts/TaskContext";

export default function Board() {

    return (
        <div className={styles.board_container}>
            <TaskContextProvider>
                <Header/>
                <GroupContextProvider>
                    <TaskBoard/>
                </GroupContextProvider>
            </TaskContextProvider>
        </div>
    )
}