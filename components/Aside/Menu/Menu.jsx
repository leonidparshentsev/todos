import { useProjectContext } from "../../contexts/ProjectContext";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./Menu.module.css";

export default function Menu() {
        
    const { projects } = useProjectContext();

    return (
        <ul className={styles.list_menu}>
            {projects && projects.map(({ projectTitle, id }) =>
                <MenuItem
                    key={id}    
                    title={projectTitle}
                    projectId={id} 
                    />
            )}
        </ul>
    );
}