import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const { REACT_APP_API_URL } = process.env

const SocketContext = createContext<Socket | null>(null)

const SocketProvider: React.FC = ({ children }) => {
    const socket = io(REACT_APP_API_URL!)

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
