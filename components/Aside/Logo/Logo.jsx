import { memo } from "react";
import styles from "./Logo.module.css";

export default memo(function Logo() {
    return (
        <div className={styles.logo}>
            <h1>LOGOTYPE</h1>
        </div>
    );
})