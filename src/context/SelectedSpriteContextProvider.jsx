import { createContext, useState } from "react"

export const SelectedSpriteContext = createContext(null)

const SelectedSpriteContextProvider = ({children}) => {
    const [selectedSprite, setSelectedSprite] = useState(null);

    return (
        <SelectedSpriteContext.Provider value={{
            selectedSprite, setSelectedSprite
        }}>
            {children}
        </SelectedSpriteContext.Provider>
    )
}

export default SelectedSpriteContextProvider