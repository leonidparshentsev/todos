import { usePopups } from "../../contexts/PopupsContext";
import styles from "./GroupPopup.module.css"

export default function GroupPopup({
    placeholder,
    // groupPopupRef,
    inputRightSideCoord,
    setNewGroupPopupInputValue,
    addNewGroupHandler,
    editGroupNameHandler,
    }) {

        const {groupPopupRef} = usePopups();

        const handler = addNewGroupHandler ? addNewGroupHandler : editGroupNameHandler;

        return (
                <div
                    className={styles.new_group__popup}
                    ref={groupPopupRef}
                    style={{ right: inputRightSideCoord }} >
                    <input
                        autoFocus
                        className={styles.popup__input}
                        onChange={(e) => setNewGroupPopupInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Escape') handler();
                        }}
                        type="text" placeholder={placeholder} />
                    <button
                        className={styles.popup__button}
                        onClick={handler}
                        >Done</button>
                </div>
        )
}

