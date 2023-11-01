import styles from './MainWrapper.module.css'

import Aside from '../Aside/Aside';
import Board from '../Board/Board';
import { ProjectContextProvider } from '../contexts/ProjectContext';

export default function MainWrapper() {
    
    return (
      <div className={styles.container}>
        <ProjectContextProvider>
            <Aside/>
            <Board/>
        </ProjectContextProvider>
      </div>
    );
  }