// React core
import {useEffect, useState} from "react";

// socket.io-client
import {io} from "socket.io-client";

if (!process.env.REACT_APP_SERVER_URL) {
    throw new Error("Server URL not configured. Please check environment variables.");
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

if (!SERVER_URL) {
    throw new Error("Server URL not configured. Please check environment variables.");
}

/**
 * Custom hook managing WebSocket connection for online gameplay
 *
 * @description
 * Manages WebSocket connection with automatic reconnection,
 * heartbeat, and connection status tracking.
 *
 * @returns {Object} Socket connection details
 * @property {Socket} socket - Socket.io instance
 * @property {boolean} socketConnected - Current connection status
 *
 * @example
 * const { socket, socketConnected } = useSocketConnection();
 */

// socket configuration
const createSocket = () => io(process.env.REACT_APP_SERVER_URL, {
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    transports: ["websocket"],
    autoConnect: true,
    forceNew: false,

    // Prevents connection drops and enables quick disconnect detection
    pingInterval: 25000,
    pingTimeout: 20000,
});

export const useSocketConnection = () => {
    const [socket] = useState(createSocket);
    const [socketConnected, setSocketConnected] = useState(false);
    const [serverDisconnected, setServerDisconnected] = useState(false);


    useEffect(() => {
        setSocketConnected(socket.connected);

        const handleConnect = () => {
            setSocketConnected(true);
            setServerDisconnected(false);
        };

        const handleDisconnect = (reason) => {
            setSocketConnected(false);
            setServerDisconnected(true);
        };

        const handleError = (error) => {
            console.error("Connection error:", error);
            setSocketConnected(false);
            setServerDisconnected(true);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleError);

        // clean socket
        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleError);
        };
    }, [socket]);

    return {socket, socketConnected, serverDisconnected};
};