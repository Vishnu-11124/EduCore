import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [allCourses, setAllCourses] = useState([])

    // fetch all courses and set to state
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
    },[])

    const value = {
        allCourses,
        setAllCourses
    }
    return  (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}