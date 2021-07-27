import React, { createContext, useContext } from 'react'

import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

const SocketProvider: React.FC = ({ children }) => {
    const socket = io('http://localhost:3001')

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
