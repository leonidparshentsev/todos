import ProjectPopup from '../ProjectPopup/ProjectPopup';
import styles from './ItemMenu.module.css'

export default function ItemMenu({
        title,     
        projectId, 
        activeProjectId,
        
        // addProject,
        editProjectTitle,
        removeProject,
        openProjectBoard,

        projectPopupVisible,
        setProjectPopupVisible}) {

    return (projectPopupVisible !== projectId ?
        (<li className={`${styles.list_menu__item} ${(activeProjectId === projectId ? styles.active : '')}`}
            onClick={() => openProjectBoard(projectId)}>
            <svg className={styles.item__svg} width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#0F1729" />
            </svg>
            <p className={styles.item__p}>{title}</p>
            <div className={styles.item__group_options} >
                <div className={`${styles.options}`} onClick={(e) =>{
                    e.stopPropagation();
                    setProjectPopupVisible(projectId)
                } }>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Edit / Edit_Pencil_01">
                        <path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
                <div className={`${styles.options}`} onClick={(e) => {
                    e.stopPropagation();
                    removeProject(projectId);
                } }>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Interface / Trash_Full">
                    <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </svg>
                </div>
            </div>
        </li>) : (
            <ProjectPopup
                projectId={projectId}
                editProjectTitle={editProjectTitle}
                setProjectPopupVisible={setProjectPopupVisible} />
        )
    );
}