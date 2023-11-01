import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import ProjectPopup from "./ProjectPopup/ProjectPopup";
import styles from "./Aside.module.css"
import { useState } from "react";

export default function Aside() {

    const [projectPopupVisible, setProjectPopupVisible] = useState(false);

    return (
        <aside className={styles.aside_container}>
            <Logo />
            <Menu />
            {projectPopupVisible ? (
                <ProjectPopup
                    setProjectPopupVisible={setProjectPopupVisible}
                    isNewProjectPopup/>
            ) : (
                <button
                    className={styles.aside__button}
                    onClick={() => setProjectPopupVisible(true)}
                >+ Add a project</button>
            )}
        </aside>
    )
}