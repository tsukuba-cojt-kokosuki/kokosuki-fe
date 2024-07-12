import { ReactNode, createContext } from "react"
import useSWR from "swr"
import { paths } from "@/lib/api/schema"

type User =
  | {
      id: null
      name: null
    }
  | {
      id: string
      name: string
    }

const defaultUser = {
  id: null,
  name: null,
}

export const UserContext = createContext<User>(defaultUser)

type Response = paths["/users/me"]["get"]["responses"]["200"]["content"]["application/json"]

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const { data, isLoading, error } = useSWR<Response>("/users/me")

  const value = isLoading || error || data === undefined ? defaultUser : data

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
