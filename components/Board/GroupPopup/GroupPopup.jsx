import styles from "./GroupPopup.module.css"

export default function GroupPopup({
    placeholder,
    groupPopupRef,
    inputRightSideCoord,
    setNewGroupPopupInputValue,
    addNewGroupHandler,
    editGroupHandler,
    }) {
        return (
                <div
                    className={styles.new_group__popup}
                    ref={groupPopupRef}
                    style={{ right: inputRightSideCoord }} >
                    <input
                        autoFocus
                        className={styles.popup__input}
                        onChange={(e) => setNewGroupPopupInputValue(e.target.value)}
                        type="text" placeholder={placeholder} />
                    <button
                        className={styles.popup__button}
                        onClick={() => {
                            if(addNewGroupHandler) addNewGroupHandler();
                            else editGroupHandler();
                        }}>Done</button>
                </div>
        )
}

