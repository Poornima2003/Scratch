import { createContext, useState } from "react"

export const ActionsContext = createContext(null)

const ActionsContextProvider = ({children}) => {
    const [positions, setPositions] = useState({}); 
    const [rotations, setRotations] = useState({});
    
   

   
    return (
        <ActionsContext.Provider value={{positions, setPositions, rotations, setRotations}}>
            {children}
        </ActionsContext.Provider>
    )
}
export default ActionsContextProvider