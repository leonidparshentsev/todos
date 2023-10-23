import { useState } from "react";
import styles from "./TaskLineHeader.module.css"
import ColorsPopup from "../ColorsPopup/ColorsPopup";
import { usePopups } from "../../contexts/PopupsContext";
import { useGroupContext } from "../../contexts/GroupContext";
import ItemOptions from "../../Aside/ItemOptions/ItemOptions";

export default function TaskLineHeader({
    title, 
    tasks,
    groupId, 
    groupColorId,
    colors,
    projectId,
    lineHeaderRef,
    showNewGroupPopupHandler,

    style,

    isHovering,
    editGroupColorHandler
    }) {
    
    const {colorsPopupVisible,
        setColorsPopupVisible} = usePopups();

    const {removeGroup} = useGroupContext();

    const [colorId, setColorId] = useState(groupColorId);

    return (
        <div className={styles.task_line__header} ref={lineHeaderRef}>
            <div
                className={styles.task_line__title_container}
                onClick={showNewGroupPopupHandler} >
                <h3
                    className={styles.task_line__title}
                    style={style.title}>{title}</h3>
            </div>

            <p
                className={styles.task_line__task_count}
                style={style.taskCount}
                >{tasks.length}</p>

            <div className={`${styles.task_line__group_options} ${isHovering && styles.hover}`} >
                <ItemOptions 
                 colorHandler={() => setColorsPopupVisible(`${projectId}-${groupId}`)}
                 removeHandler={() => removeGroup(groupId)}
                 
                 style={style}
                 isColorEditor/>
            </div>

            {colorsPopupVisible === `${projectId}-${groupId}`
                && <ColorsPopup
                    colors={colors}
                    currentColorId={colorId}
                    setColorId={setColorId}
                    editGroupColorHandler={editGroupColorHandler} />}
        </div>
    )
}