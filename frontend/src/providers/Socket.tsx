import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const { NODE_ENV } = process.env

const SocketContext = createContext<Socket | null>(null)

const SocketProvider: React.FC = ({ children }) => {
    const socket = io(NODE_ENV !== 'production' ? 'http://localhost:3001' : window.location.href)

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
