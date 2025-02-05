// React core
import {useState} from "react";

/**
 * Custom hook for managing reset confirmation dialogs in the game (reset scores and reset board)
 *
 * @returns {Object} Dialog control functions and state
 * @property {boolean} showConfirmationDialog - Whether the confirmation dialog is visible
 * @property {string|null} pendingReset - Type of reset pending ("board" or "scores")
 * @property {Function} openResetDialog - Opens dialog with specified reset type
 * @property {Function} closeResetDialog - Closes dialog and clears pending reset
 *
 * @example
 * const { showConfirmationDialog, pendingReset, openResetDialog, closeResetDialog } = useResetDialog();
 */

export const useResetDialog = () => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [pendingReset, setPendingReset] = useState(null);

    const openResetDialog = (resetType) => {
        setShowConfirmationDialog(true);
        setPendingReset(resetType);
    };

    const closeResetDialog = () => {
        setShowConfirmationDialog(false);
        setPendingReset(null);
    };

    return {
        showConfirmationDialog,
        pendingReset,
        openResetDialog,
        closeResetDialog
    };
};