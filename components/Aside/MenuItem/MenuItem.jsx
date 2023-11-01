import { useState } from 'react';

import { useProjectContext } from '../../contexts/ProjectContext';
import ItemOptions from '../ItemOptions/ItemOptions';
import ProjectPopup from '../ProjectPopup/ProjectPopup';
import styles from './MenuItem.module.css'

export default function MenuItem({
        title,     
        projectId
    }) {

    const { activeProject, removeProject, openProjectBoard } = useProjectContext();
    const [projectPopupVisible, setProjectPopupVisible] = useState(false);

    const showEditPopupHandler = (e) => {
        e.stopPropagation();
        setProjectPopupVisible(true)
    };

    const removeProjectHandler = (e) => {
        e.stopPropagation();
        removeProject(projectId);
    };

    return (!projectPopupVisible ?
        (<li 
            className={`${styles.list_menu__item} 
            ${( activeProject && activeProject.id === projectId && styles.active)}`}
            onClick={() => openProjectBoard(projectId)}
            >
            <svg className={styles.item__svg} width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#0F1729" />
            </svg>
            <p className={styles.item__p}>{title}</p>

            <div className={styles.item__group_options} >
                <ItemOptions 
                    className={styles.item__group_options}                    
                    editHandler={showEditPopupHandler}
                    removeHandler={removeProjectHandler}/>
            </div>
        </li>) : (
            <ProjectPopup
                projectId={projectId}
                setProjectPopupVisible={setProjectPopupVisible}
            />
        )
    );
}