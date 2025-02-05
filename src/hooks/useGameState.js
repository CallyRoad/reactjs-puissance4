// React core
import {useState} from "react";

/**
 * Custom hook managing game session state
 *
 * @description
 * Manages the state of a game session including player information,
 * game status, and opponent details
 *
 * Game States:
 * - "waiting": Initial state, waiting for action
 * - "playing": Game in progress
 * - Various other states as needed
 *
 * @returns {Object} Game state controls
 * @property {Object} gameState - Current game state
 * @property {string|null} gameState.gameId - Unique game identifier
 * @property {number|null} gameState.playerId - Player's ID in game
 * @property {string} gameState.status - Current game status
 * @property {string} gameState.playerName - Player's name
 * @property {string} gameState.opponentName - Opponent's name
 * @property {Function} updateGameState - Updates partial game state
 * @property {Function} resetGameState - Resets to initial state
 *
 * @example
 * const { gameState, updateGameState, resetGameState } = useGameState();
 */

// Initial game state configuration
const initialGameState = {
    gameId: null,
    playerId: null,
    status: "waiting",
    playerName: "",
    opponentName: ""
};

export const useGameState = () => {
    const [gameState, setGameState] = useState(initialGameState);

    const updateGameState = (newState) => {
        setGameState(prev => ({
            ...prev,
            ...newState
        }));
    };

    const resetGameState = () => {
        setGameState(initialGameState);
    };

    return { gameState, updateGameState, resetGameState };
};