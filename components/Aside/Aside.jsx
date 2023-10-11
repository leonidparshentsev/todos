import ListMenu from "./ListMenu/ListMenu";
import Logo from "./Logo/Logo";
import styles from "./Aside.module.css"
import { useState } from "react";

export default function Aside({projects, addProject, openProjectBoard, activeProject}) {
    const [projectPopupVisible, setProjectPopupVisible] = useState(false);

    let addProjectHandle = (e) => {
        let newValue = e.target.value;
        if(newValue) {
            addProject(newValue);
        }
        setProjectPopupVisible(!projectPopupVisible);
    };

    return (
        <aside className={styles.aside_container}>
            <Logo />
            <ListMenu 
                projects={projects} 
                openProjectBoard = {openProjectBoard} 
                activeProject = {activeProject} />
            {projectPopupVisible ? (
                <div className={styles.aside__input}>
                    <svg className={styles.item_svg} width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#0F1729" />
                    </svg>
                    <input type="text"
                        autoFocus
                        onBlur={addProjectHandle}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addProjectHandle(e);
                        }}
                        className={styles.input} />
                </div>
            ) : (
                <button className={styles.aside__button} onClick={(e) => {
                    e.preventDefault();
                    setProjectPopupVisible(true);
                }}>+ Add a project</button>
            )}
        </aside>
    )
}