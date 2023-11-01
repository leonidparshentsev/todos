import styles from './ColorsPopup.module.css'
import { useGroupContext } from '../../contexts/GroupContext';

export default function ColorsPopup({
        colorsList, 
        currentColorId,
        groupId,

        popupLeftCoord,
        setVisible,
        }) {

    const { editGroupColor } = useGroupContext();

    return (
    <div className={styles.container}
        onClick={() => setVisible(false)}
    >
        <div className={styles.colors_popup}
            style={{left: popupLeftCoord}}
            onClick={(e) => e.stopPropagation()}
        >
            <p className={styles.colors_popup__title}>Colors</p>
            <ul className={styles.colors_popup__list}>
                {Object.entries(colorsList).map((color) => {
                    return (
                    <li
                        key={color[0]}
                        className={styles.colors_popup__list_item}
                        onClick={() => {
                            editGroupColor(color[0], groupId);
                            setVisible(false);
                    }}>

                        <div className={`${styles.item__color_box} ${styles[color[1]]}`}></div>
                        <p className={styles.item__p}>{color[1]}</p>

                        {+currentColorId === +color[0]
                            && <svg className={styles.item__svg} width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#0F1729" />
                            </svg>
                                }
                    </li>)
                })}
            </ul>
        </div>
    </div>
    )
}