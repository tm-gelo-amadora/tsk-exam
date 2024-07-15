import { createContext, FC, ReactNode, useEffect, useState } from 'react'

type SidebarContextData = {
    isOpen: boolean
    toggle: (state?: boolean) => void
  }
  
export const SidebarContext = createContext<SidebarContextData>({
    isOpen: false,
    toggle: () => {},
})

export const SidebarContextProvider: FC<{ children: ReactNode }> = ({
    children,
  }) => {
    
    const [isOpen, setIsOpen] = useState(false)

    //  * this is interesting, setIsOpen is declared here. 
    // * setIsOpen can now be accessed by other components that use this context
    const toggle: SidebarContextData['toggle'] = (state) => {
      // * checks if state is an actual boolean, if not, we take whatever value and negate it
      setIsOpen((value) => (typeof state === 'boolean' ? state : !value))
    }
  
    const contextData: SidebarContextData = { isOpen, toggle }
  
    useEffect(() => {
      setIsOpen(false)
    }, [])
  
    return (
      <SidebarContext.Provider value={contextData}>
        {children}
      </SidebarContext.Provider>
    )
  }
  