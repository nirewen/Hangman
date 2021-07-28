import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const { ENVIRONMENT } = process.env

const SocketContext = createContext<Socket | null>(null)

const SocketProvider: React.FC = ({ children }) => {
    const socket = io(ENVIRONMENT === 'production' ? window.location.href : 'http://localhost:3001')

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
