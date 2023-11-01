import { useState } from "react";
import { useGroupContext } from "../../contexts/GroupContext";
import styles from "./GroupPopup.module.css"

export default function GroupPopup({
    placeholder,
    inputLeftSideCoord,

    groupId,
    setVisible,
    }) {

        const [inputValue, setInputValue] = useState('');
        const { addGroup, editGroupName } = useGroupContext();

        const addNewGroupHandler = (value) => {
            addGroup(value);
            setVisible(false);
        }

        const editGroupNameHandler = (value) => {
            editGroupName(value, groupId);
            setVisible(false);
        }

        const handler = placeholder === 'New group' ? addNewGroupHandler : editGroupNameHandler;

        return (
            <div
                className={styles.new_group__container}
                onClick={() => setVisible(false)}>
                <div
                    className={styles.new_group__popup}
                    // ref={groupPopupRef}
                    style={{ left: inputLeftSideCoord, top: 100 }}
                    onClick={e => e.stopPropagation()} >
                    <input
                        autoFocus
                        className={styles.popup__input}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handler(inputValue);
                            if (e.key === 'Escape') setVisible(false);
                        }}
                        type="text" 
                        placeholder={placeholder} />
                    <button
                        className={styles.popup__button}
                        onClick={() => handler(inputValue)}
                    >Done</button>
                </div>
            </div>
        )
}

