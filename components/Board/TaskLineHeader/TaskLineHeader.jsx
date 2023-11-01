import { useState } from "react";
import styles from "./TaskLineHeader.module.css"
import ColorsPopup from "../ColorsPopup/ColorsPopup";
import { useGroupContext } from "../../contexts/GroupContext";
import ItemOptions from "../../Aside/ItemOptions/ItemOptions";
import { colorsList } from "../../../utils/colorStyle";

export default function TaskLineHeader({
    group,
    style,
    lineHeaderRef,
    showNewGroupPopupHandler,
    isHovering,
    }) {

    const { removeGroup } = useGroupContext();
    
    const [colorsPopupVisible, setColorsPopupVisible] = useState(false);
    const [popupLeftCoord, setPopupLeftCoord] = useState(220);

    const showColorPopupHandler = (e) => {
        let inputBtnLeftCoord = e.target.getBoundingClientRect().left;
        let clientRightCoord = document.documentElement.clientWidth; 

        if(inputBtnLeftCoord - 80 < 220) {
            setPopupLeftCoord(220)
        } else if(inputBtnLeftCoord + 80 > clientRightCoord) {
            setPopupLeftCoord(clientRightCoord - 180)
        } else {
            setPopupLeftCoord(inputBtnLeftCoord - 75);
        }

        setColorsPopupVisible(true);
    };

    const removeHandler = () => {
        let ask = confirm('Are you sure?');
        if(!ask) return;

        removeGroup(group.id);
    };

    return (
        <div className={styles.task_line__header} ref={lineHeaderRef}>
            <div
                className={styles.task_line__title_container}
                onClick={showNewGroupPopupHandler} 
            >
                <h3
                    className={styles.task_line__title}
                    style={style.title}
                >
                    {group.groupTitle}
                </h3>
            </div>

            <p
                className={styles.task_line__task_count}
                style={style.taskCount}
            >
                {group.tasks.length}
            </p>

            <div className={`${styles.task_line__group_options} ${isHovering && styles.hover}`} >
                <ItemOptions 
                 colorHandler={showColorPopupHandler}
                 removeHandler={removeHandler}
                 style={style}
                 isColorEditor/>
            </div>

            {colorsPopupVisible
                && <ColorsPopup
                    colorsList={colorsList}
                    currentColorId={group.colorId}
                    groupId={group.id}
                    
                    popupLeftCoord={popupLeftCoord}
                    setVisible={setColorsPopupVisible}/>
            }
        </div>
    )
}