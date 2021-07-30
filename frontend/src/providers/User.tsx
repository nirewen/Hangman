import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'
import api from 'services/api'

export interface User {
    id: string
    username: string
    discriminator: string
    avatar: string
}

const UserContext = createContext<User>({} as User)

const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({} as User)

    useEffect(() => {
        api.get('/api/user', { withCredentials: true })
            .then(({ data }) => setUser(data))
            .catch(console.error)
    }, [])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider

export const useUser = () => useContext(UserContext)
