/**
 * Enhanced TextDisplay Component with Dark Theme & Advanced Typo Visualization
 * Features:
 * - Dark theme styling (#121212 background, #E0E0E0 text)
 * - Advanced typo visualization: incorrect chars displayed above crossed-out correct chars
 * - Smooth animations for character state transitions
 * - Real-time cursor positioning with blinking effect
 */

import React from 'react';
import { CharacterState, getCharacterStates } from '../utils/calculations';

interface TextDisplayProps {
    originalText: string;
    userInput: string;
    currentIndex: number;
}

interface TypoOverlay {
    index: number;
    correctChar: string;
    typedChar: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ originalText, userInput, currentIndex }) => {
    const characterStates = getCharacterStates(userInput, originalText, currentIndex);

    // Generate typo overlays for incorrect characters
    const typoOverlays: TypoOverlay[] = [];
    for (let i = 0; i < Math.min(userInput.length, originalText.length); i++) {
        if (userInput[i] !== originalText[i]) {
            typoOverlays.push({
                index: i,
                correctChar: originalText[i],
                typedChar: userInput[i]
            });
        }
    }

    const getCharacterClassName = (state: CharacterState, index: number): string => {
        const baseClasses = 'relative inline-block transition-all duration-200 ease-out';
        const spacing = originalText[index] === ' ' ? 'min-w-[0.75rem]' : 'min-w-[0.5rem]';

        switch (state) {
            case CharacterState.CORRECT:
                return `${baseClasses} ${spacing} text-[#4CAF50] bg-[#4CAF50]/10`;
            case CharacterState.INCORRECT:
                return `${baseClasses} ${spacing} text-[#888888] line-through bg-[#F44336]/10`;
            case CharacterState.CURSOR:
                return `${baseClasses} ${spacing} text-[#E0E0E0] bg-[#BB86FC] animate-pulse shadow-lg`;
            case CharacterState.UNTYPED:
            default:
                return `${baseClasses} ${spacing} text-[#E0E0E0]`;
        }
    };

    const renderCharacterWithOverlay = (char: string, index: number, state: CharacterState) => {
        const typoOverlay = typoOverlays.find(overlay => overlay.index === index);
        const displayChar = char === ' ' ? '\u00A0' : char;

        return (
            <span
                key={index}
                className={getCharacterClassName(state, index)}
                style={{ position: 'relative' }}
            >
                {/* Incorrect character overlay (displayed above) */}
                {typoOverlay && (
                    <span
                        className="absolute -top-6 left-0 text-[#F44336] text-sm font-bold animate-bounce"
                        style={{
                            animation: 'fadeInBounce 0.3s ease-out',
                            textShadow: '0 0 4px rgba(244, 67, 54, 0.5)'
                        }}
                    >
                        {typoOverlay.typedChar === ' ' ? '␣' : typoOverlay.typedChar}
                    </span>
                )}

                {/* Main character */}
                <span className="relative z-10">
                    {displayChar}
                </span>

                {/* Cursor indicator */}
                {state === CharacterState.CURSOR && (
                    <span
                        className="absolute -right-0.5 top-0 w-0.5 h-full bg-[#FFFFFF] animate-pulse"
                        style={{
                            animation: 'blink 1s infinite',
                        }}
                    />
                )}
            </span>
        );
    };

    return (
        <>
            <style>{`
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

            <div className="w-full max-w-4xl mx-auto p-6 bg-[#2C2C2C] rounded-lg shadow-2xl">
                {/* Main text display area */}
                <div
                    className="text-[19px] leading-[1.5] font-mono select-none bg-[#121212] p-6 rounded-lg border border-[#333333]"
                    style={{
                        fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                        minHeight: '120px'
                    }}
                >
                    {originalText.split('').map((char, index) =>
                        renderCharacterWithOverlay(char, index, characterStates[index])
                    )}
                </div>

                {/* Enhanced progress indicator */}
                <div className="mt-6 w-full bg-[#333333] rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-[#BB86FC] to-[#4CAF50] h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                        style={{
                            width: `${Math.min((currentIndex / originalText.length) * 100, 100)}%`,
                            boxShadow: '0 0 10px rgba(187, 134, 252, 0.5)'
                        }}
                    />
                </div>

                {/* Character position info with dark theme */}
                <div className="mt-4 text-sm text-[#E0E0E0]/70 text-center font-mono">
                    <span className="text-[#BB86FC]">{currentIndex}</span>
                    <span className="mx-2">/</span>
                    <span className="text-[#4CAF50]">{originalText.length}</span>
                    <span className="ml-2">characters</span>
                    {typoOverlays.length > 0 && (
                        <span className="ml-4 text-[#F44336]">
                            • {typoOverlays.length} error{typoOverlays.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default TextDisplay;