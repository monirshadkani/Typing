/**
 * TypingTest Component
 * Main container that orchestrates the typing test experience
 * Manages state, timer, input handling, and real-time calculations
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import TextDisplay from './TextDisplay';
import InputArea from './InputArea';
import Timer from './Timer';
import Results from './Results';
import Controls, { TimerDuration, StartMode } from './Controls';
import { TextGenerator } from '../utils/textGenerator';
import { calculateTypingStats, TypingStats } from '../utils/calculations';

interface TypingTestState {
    originalText: string;
    userInput: string;
    currentIndex: number;
    isActive: boolean;
    isCompleted: boolean;
    timeLeft: number;
    startTime: number | null;
    testStartTime: number | null; // Separate timer start time for accurate timing
    rawTypos: number;
    selectedDuration: TimerDuration;
    startMode: StartMode;
    hasStartedTyping: boolean;
}

const TypingTest: React.FC = () => {
    const [state, setState] = useState<TypingTestState>({
        originalText: '',
        userInput: '',
        currentIndex: 0,
        isActive: false,
        isCompleted: false,
        timeLeft: 60,
        startTime: null,
        testStartTime: null,
        rawTypos: 0,
        selectedDuration: 60,
        startMode: 'immediate',
        hasStartedTyping: false
    });

    const [results, setResults] = useState<TypingStats | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const textGenerator = useRef(new TextGenerator());

    // Complete test and calculate results
    const completeTest = useCallback(() => {
        if (!state.startTime) return;

        const timeElapsed = Date.now() - state.startTime;
        const stats = calculateTypingStats(
            state.userInput,
            state.originalText,
            state.rawTypos,
            timeElapsed
        );

        setResults(stats);
        setState(prev => ({
            ...prev,
            isActive: false,
            isCompleted: true
        }));

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, [state.startTime, state.userInput, state.originalText, state.rawTypos]);

    // Accurate timer countdown effect using timestamps
    useEffect(() => {
        if (!state.isActive || !state.testStartTime) {
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const elapsed = Math.floor((now - state.testStartTime!) / 1000);
            const remaining = Math.max(0, state.selectedDuration - elapsed);

            setState(prev => ({ ...prev, timeLeft: remaining }));

            if (remaining <= 0) {
                completeTest();
                return;
            }

            // Use requestAnimationFrame for smooth updates, but limit to reasonable frequency
            timerRef.current = setTimeout(updateTimer, 100); // Update every 100ms for smooth display
        };

        updateTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [state.isActive, state.testStartTime, state.selectedDuration, completeTest]);

    // Generate new text passage with API support and fallback
    const generateNewText = useCallback(async () => {
        try {
            // Try async generation with API first
            const newText = await textGenerator.current.generatePassageAsync({
                targetLength: Math.max(200, state.selectedDuration * 4), // Adjust length based on duration
                minSentences: 3,
                maxSentences: 10,
                useApi: true
            });

            setState(prev => ({
                ...prev,
                originalText: newText,
                userInput: '',
                currentIndex: 0,
                rawTypos: 0,
                hasStartedTyping: false
            }));
        } catch (error) {
            console.warn('Async text generation failed, using synchronous fallback:', error);

            // Fallback to synchronous generation
            const fallbackText = textGenerator.current.generatePassage({
                targetLength: Math.max(200, state.selectedDuration * 4),
                minSentences: 3,
                maxSentences: 10
            });

            setState(prev => ({
                ...prev,
                originalText: fallbackText,
                userInput: '',
                currentIndex: 0,
                rawTypos: 0,
                hasStartedTyping: false
            }));
        }
    }, [state.selectedDuration]);

    // Start test
    const startTest = useCallback(async () => {
        await generateNewText();

        const now = Date.now();
        setState(prev => ({
            ...prev,
            isActive: prev.startMode === 'immediate',
            isCompleted: false,
            timeLeft: prev.selectedDuration,
            startTime: prev.startMode === 'immediate' ? now : null,
            testStartTime: prev.startMode === 'immediate' ? now : null,
            hasStartedTyping: false
        }));

        setResults(null);
    }, [generateNewText]);

    // Handle input changes
    const handleInput = useCallback((value: string) => {
        setState(prev => {
            const newIndex = value.length;
            let newState = {
                ...prev,
                userInput: value,
                currentIndex: newIndex
            };

            // Handle start on first keystroke mode
            if (prev.startMode === 'on_keystroke' && !prev.hasStartedTyping && value.length > 0) {
                const now = Date.now();
                newState = {
                    ...newState,
                    isActive: true,
                    startTime: now,
                    testStartTime: now,
                    hasStartedTyping: true
                };
            }

            // Check if test is completed (all text typed correctly)
            if (newIndex >= prev.originalText.length) {
                // Complete test immediately when all text is typed
                setTimeout(completeTest, 100);
            }

            return newState;
        });
    }, [completeTest]);

    // Handle individual key presses for typo counting
    const handleKeyPress = useCallback((key: string, isCorrect: boolean) => {
        if (!isCorrect) {
            setState(prev => ({
                ...prev,
                rawTypos: prev.rawTypos + 1
            }));
        }
    }, []);

    // Handle duration change
    const handleDurationChange = useCallback((duration: TimerDuration) => {
        setState(prev => ({
            ...prev,
            selectedDuration: duration,
            timeLeft: duration
        }));
    }, []);

    // Handle start mode change
    const handleStartModeChange = useCallback((mode: StartMode) => {
        setState(prev => ({
            ...prev,
            startMode: mode
        }));
    }, []);

    // Reset for new test
    const handleRestart = useCallback(() => {
        setState(prev => ({
            ...prev,
            originalText: '',
            userInput: '',
            currentIndex: 0,
            isActive: false,
            isCompleted: false,
            timeLeft: prev.selectedDuration,
            startTime: null,
            testStartTime: null,
            rawTypos: 0,
            hasStartedTyping: false
        }));
        setResults(null);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    // Show results if test is completed
    if (results) {
        return <Results stats={results} onRestart={handleRestart} />;
    }

    return (
        <div className="min-h-screen bg-[#121212] py-8">
            <div className="container mx-auto px-4 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-[#E0E0E0] mb-4 font-mono">
                        <span className="text-[#BB86FC]">Typing</span>{' '}
                        <span className="text-[#4CAF50]">Speed</span>{' '}
                        <span className="text-[#E0E0E0]">Test</span>
                    </h1>
                    <p className="text-[#E0E0E0]/70 text-lg font-mono">
                        Test your typing speed and accuracy with{' '}
                        <span className="text-[#BB86FC]">advanced typo visualization</span>
                    </p>
                    <div className="mt-2 text-sm text-[#E0E0E0]/50 font-mono">
                        Dark theme • Real-time feedback • Professional metrics
                    </div>
                </div>

                {/* Controls */}
                <Controls
                    selectedDuration={state.selectedDuration}
                    onDurationChange={handleDurationChange}
                    startMode={state.startMode}
                    onStartModeChange={handleStartModeChange}
                    onStart={startTest}
                    isActive={state.isActive || (state.startMode === 'on_keystroke' && state.originalText !== '')}
                    isCompleted={state.isCompleted}
                />

                {/* Timer - only show when test is active or ready to start */}
                {(state.isActive || (state.originalText && !state.isCompleted)) && (
                    <div className="flex justify-center">
                        <Timer
                            timeLeft={state.timeLeft}
                            totalTime={state.selectedDuration}
                            isActive={state.isActive}
                        />
                    </div>
                )}

                {/* Text Display and Input Area */}
                {state.originalText && (
                    <>
                        <TextDisplay
                            originalText={state.originalText}
                            userInput={state.userInput}
                            currentIndex={state.currentIndex}
                        />

                        <InputArea
                            isActive={state.isActive || (state.startMode === 'on_keystroke' && !state.hasStartedTyping)}
                            onInput={handleInput}
                            onKeyPress={handleKeyPress}
                            expectedText={state.originalText}
                            currentInput={state.userInput}
                            disabled={state.isCompleted}
                        />
                    </>
                )}

                {/* Enhanced Live Stats - show during active test */}
                {state.isActive && state.testStartTime && (
                    <div className="flex justify-center">
                        <div className="stats-panel bg-[#2C2C2C] rounded-lg shadow-2xl p-6 border border-[#404040]">
                            <div className="flex space-x-8 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl font-bold text-[#BB86FC] font-mono">
                                        {(() => {
                                            const elapsed = (state.selectedDuration - state.timeLeft) / 60; // minutes elapsed
                                            return elapsed > 0 ? Math.round(((state.userInput.length / 5) / elapsed) || 0) : 0;
                                        })()}
                                    </div>
                                    <div className="text-sm text-[#E0E0E0]/70 font-mono mt-1">WPM</div>
                                    <div className="w-8 h-1 bg-[#BB86FC] rounded-full mt-1"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl font-bold text-[#4CAF50] font-mono">
                                        {state.userInput.length > 0 ?
                                            Math.round(((state.userInput.split('').filter((char, i) => char === state.originalText[i]).length) / state.userInput.length) * 100)
                                            : 100
                                        }%
                                    </div>
                                    <div className="text-sm text-[#E0E0E0]/70 font-mono mt-1">Accuracy</div>
                                    <div className="w-8 h-1 bg-[#4CAF50] rounded-full mt-1"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl font-bold text-[#F44336] font-mono">{state.rawTypos}</div>
                                    <div className="text-sm text-[#E0E0E0]/70 font-mono mt-1">Raw Errors</div>
                                    <div className="w-8 h-1 bg-[#F44336] rounded-full mt-1"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl font-bold text-[#FF9800] font-mono">
                                        {Math.round((state.selectedDuration - state.timeLeft) * 10) / 10}s
                                    </div>
                                    <div className="text-sm text-[#E0E0E0]/70 font-mono mt-1">Elapsed</div>
                                    <div className="w-8 h-1 bg-[#FF9800] rounded-full mt-1"></div>
                                </div>
                            </div>

                            {/* Real-time performance indicator */}
                            <div className="mt-4 pt-4 border-t border-[#404040] text-center">
                                <div className="text-xs text-[#E0E0E0]/50 font-mono">
                                    Real-time performance tracking • {state.userInput.length} chars typed
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypingTest;
