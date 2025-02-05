// React core
import React from 'react';

// Style
import mgame from "../../../game.module.scss";

/* Modal dialog component for confirming user actions */
const ConfirmationDialog = ({
                                isOpen, // Component returns null when isOpen is false
                                message,
                                onConfirm,
                                onCancel
                            }) => {
    if (!isOpen) return null;

    return (
        <div className={mgame["modal-overlay"]}>
            <div className={mgame["modal-content"]}>

                {/* Confirmation message */}
                <h3>{message}</h3>

                {/* Buttons confirmation, "Accepter" button triggers onConfirm callback , "Refuser" button triggers onCancel callback */}
                <div className={mgame["modal-buttons"]}>
                    <button onClick={onConfirm}>Accepter</button>
                    <button onClick={onCancel}>Refuser</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;