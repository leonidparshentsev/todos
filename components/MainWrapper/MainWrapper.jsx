import styles from './MainWrapper.module.css'

import Aside from '../Aside/Aside';
import Board from '../Board/Board';
import { PopupsContextProvider} from '../contexts/PopupsContext';
import { ProjectContextProvider } from '../contexts/ProjectContext';

export default function MainWrapper() {
    
    return (
      <div className={styles.container}>
        <ProjectContextProvider>
          <PopupsContextProvider>
            <Aside/>
            <Board/>
          </PopupsContextProvider>
        </ProjectContextProvider>
      </div>
    );
  }