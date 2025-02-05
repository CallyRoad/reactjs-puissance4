/* Generates appropriate turn message based on game state and mode */
export const getTurnMessage = (gameState, currentPlayer, isOnline, opponentName) => {
    if (!gameState || !currentPlayer) return "";
    if (gameState.status === "preparing") {
        return "Choix du joueur qui commence...";
    }

    if (gameState.status === "finished" || gameState.status === "ended") return "";

    if (isOnline) {
        return currentPlayer === gameState.playerId
            ? `C'est votre tour ! (${gameState.playerId === 1 ? "JAUNE" : "ROUGE"})`
            : `Au tour de ${opponentName} (${gameState.playerId === 1 ? "ROUGE" : "JAUNE"})`;
    }
    return `C'est au tour du joueur ${currentPlayer === 1 ? "JAUNE" : "ROUGE"}.`;
};

/* Generates victory message based on winner and game mode */
export const getWinnerMessage = (winner, gameState, isOnline, opponentName) => {
    if (!winner) return null;

    if (isOnline) {
        return winner === gameState.playerId
            ? "🏆 Vous avez gagné ! 🏆"
            : `🏆 ${opponentName} a gagné ! 🏆`;
    }
    return `🏆 Victoire du joueur ${winner === 1 ? "jaune" : "rouge"} ! 🏆`;
};