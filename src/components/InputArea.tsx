/**
 * InputArea Component
 * Hidden input field that captures keystrokes and handles typing logic
 * Filters out non-printable keys and manages cursor position
 */

import React, { useRef, useEffect } from 'react';

interface InputAreaProps {
    isActive: boolean;
    onInput: (value: string) => void;
    onKeyPress: (key: string, isCorrect: boolean) => void;
    expectedText: string;
    currentInput: string;
    disabled?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
    isActive,
    onInput,
    onKeyPress,
    expectedText,
    currentInput,
    disabled = false
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when test becomes active
    useEffect(() => {
        if (isActive && inputRef.current && !disabled) {
            inputRef.current.focus();
        }
    }, [isActive, disabled]);

    // Keep input focused during active test
    useEffect(() => {
        const handleFocus = () => {
            if (isActive && inputRef.current && !disabled) {
                inputRef.current.focus();
            }
        };

        if (isActive && !disabled) {
            window.addEventListener('click', handleFocus);
            window.addEventListener('keydown', handleFocus);

            return () => {
                window.removeEventListener('click', handleFocus);
                window.removeEventListener('keydown', handleFocus);
            };
        }
    }, [isActive, disabled]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Don't allow typing beyond the expected text length
        if (newValue.length > expectedText.length) {
            return;
        }

        onInput(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Ignore non-printable keys for typo counting
        const nonPrintableKeys = [
            'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape',
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
            'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
        ];

        if (nonPrintableKeys.includes(e.key)) {
            return;
        }

        // Handle backspace
        if (e.key === 'Backspace') {
            return; // Allow default behavior
        }

        // For printable characters, check if they match expected character
        if (e.key.length === 1) {
            const currentIndex = currentInput.length;
            const expectedChar = expectedText[currentIndex];
            const isCorrect = e.key === expectedChar;

            onKeyPress(e.key, isCorrect);
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={disabled || !isActive}
                className="absolute opacity-0 pointer-events-none"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Typing input area"
            />

            {/* Visual indicator that input is focused */}
            {isActive && !disabled && (
                <div className="text-center text-sm text-gray-500 mt-4">
                    Start typing to begin the test
                </div>
            )}
        </div>
    );
};

export default InputArea;
