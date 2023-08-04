import { createContext, useState } from "react"
import { getAccessTokenFromLS, getProfileFromLS } from "../utils/auth"
import { User } from "../types/user.type"

interface AppContextinterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null,
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextinterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextinterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)


  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      profile: profile,
      setProfile
    }}>
      {children}
    </AppContext.Provider>
  )

}




