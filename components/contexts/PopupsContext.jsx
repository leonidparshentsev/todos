import { createContext, useContext, useState, useRef, useCallback } from "react";

const PopupsContext = createContext();

export const usePopups = () => {
    return useContext(PopupsContext);
}

export const PopupsContextProvider = ({children}) => {

    const [projectPopupVisible, setProjectPopupVisible] = useState(false);
    const [addGroupPopupVisible, setAddGroupPopupVisible] = useState(false);
    const [addTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
    const [colorsPopupVisible, setColorsPopupVisible] = useState(false);
        
    const taskPopupRef = useRef(null);
    const groupPopupRef = useRef(null);
    const colorsPopupRef = useRef(null);

    const hideActivePopups = useCallback((e) => {
        if (taskPopupRef.current && 
          !taskPopupRef.current.contains(e.target)) setAddTaskPopupVisible(false);
  
        if (groupPopupRef.current && 
            !groupPopupRef.current.contains(e.target)) setAddGroupPopupVisible(false);
        
        if (colorsPopupRef.current && 
            !colorsPopupRef.current.contains(e.target)) setColorsPopupVisible(false);
    }, []);

    return (
        <PopupsContext.Provider value={{
                hideActivePopups,

                projectPopupVisible,
                setProjectPopupVisible,
                addGroupPopupVisible,
                setAddGroupPopupVisible,
                addTaskPopupVisible, 
                setAddTaskPopupVisible,
                colorsPopupVisible,
                setColorsPopupVisible,
                taskPopupRef,
                groupPopupRef,
                colorsPopupRef
                }}>
            {children}
        </PopupsContext.Provider>
    )
}