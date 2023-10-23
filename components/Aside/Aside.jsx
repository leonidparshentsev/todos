import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import ProjectPopup from "./ProjectPopup/ProjectPopup";
import styles from "./Aside.module.css"
import { usePopups } from "../contexts/PopupsContext";

export default function Aside() {

    const { projectPopupVisible, setProjectPopupVisible } = usePopups();

    return (
        <aside className={styles.aside_container}>
            <Logo />
            <Menu />
            {projectPopupVisible === 'new' ? (
                <ProjectPopup
                    isNewProjectPopup/>
            ) : (
                <button
                    className={styles.aside__button}
                    onClick={() => setProjectPopupVisible('new')}
                >+ Add a project</button>
            )}
        </aside>
    )
}