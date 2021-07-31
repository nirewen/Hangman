import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const { REACT_APP_API_URL } = process.env

const socket = io(REACT_APP_API_URL!)
const SocketContext = createContext<Socket>(socket)

const SocketProvider: React.FC = ({ children }) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider

export const useSocket = () => useContext(SocketContext)
