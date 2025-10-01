/**
 * Controls Component
 * Start button, timer selection, and test configuration options
 * Handles start modes: immediate start vs start on first keystroke
 */

import React from 'react';

export type TimerDuration = 30 | 60 | 120;
export type StartMode = 'immediate' | 'on_keystroke';

interface ControlsProps {
    selectedDuration: TimerDuration;
    onDurationChange: (duration: TimerDuration) => void;
    startMode: StartMode;
    onStartModeChange: (mode: StartMode) => void;
    onStart: () => Promise<void>;
    isActive: boolean;
    isCompleted: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    selectedDuration,
    onDurationChange,
    startMode,
    onStartModeChange,
    onStart,
    isActive,
    isCompleted
}) => {
    const durations: TimerDuration[] = [30, 60, 120];

    const formatDuration = (seconds: number): string => {
        if (seconds < 60) return `${seconds}s`;
        return `${seconds / 60}m`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-[#2C2C2C] rounded-lg shadow-2xl border border-[#404040]">
            <div className="space-y-6">
                {/* Timer Duration Selection */}
                <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-3 font-mono">
                        Test Duration
                    </label>
                    <div className="flex space-x-3">
                        {durations.map((duration) => (
                            <button
                                key={duration}
                                onClick={() => onDurationChange(duration)}
                                disabled={isActive}
                                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 font-mono ${selectedDuration === duration
                                    ? 'bg-[#BB86FC] text-[#121212] shadow-lg border-2 border-[#BB86FC]'
                                    : 'bg-[#1F1F1F] text-[#E0E0E0] border border-[#333333] hover:bg-[#333333] hover:border-[#555555]'
                                    } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
                            >
                                {formatDuration(duration)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Mode Selection */}
                <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-3 font-mono">
                        Start Mode
                    </label>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onStartModeChange('immediate')}
                            disabled={isActive}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm font-mono ${startMode === 'immediate'
                                ? 'bg-[#4CAF50] text-[#121212] shadow-lg border-2 border-[#4CAF50]'
                                : 'bg-[#1F1F1F] text-[#E0E0E0] border border-[#333333] hover:bg-[#333333] hover:border-[#555555]'
                                } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
                        >
                            Start Immediately
                        </button>
                        <button
                            onClick={() => onStartModeChange('on_keystroke')}
                            disabled={isActive}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm font-mono ${startMode === 'on_keystroke'
                                ? 'bg-[#4CAF50] text-[#121212] shadow-lg border-2 border-[#4CAF50]'
                                : 'bg-[#1F1F1F] text-[#E0E0E0] border border-[#333333] hover:bg-[#333333] hover:border-[#555555]'
                                } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
                        >
                            Start on First Key
                        </button>
                    </div>
                    <p className="text-xs text-[#E0E0E0]/70 mt-2 font-mono">
                        {startMode === 'immediate'
                            ? 'Timer starts when you click the start button'
                            : 'Timer starts when you type the first character'
                        }
                    </p>
                </div>

                {/* Start Button */}
                <div className="text-center">
                    <button
                        onClick={() => onStart()}
                        disabled={isActive}
                        className={`py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-200 font-mono ${isActive
                            ? 'bg-[#1A1A1A] text-[#666666] cursor-not-allowed border border-[#333333]'
                            : 'bg-[#BB86FC] hover:bg-[#9C27B0] text-[#121212] hover:shadow-2xl transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-offset-2 focus:ring-offset-[#2C2C2C] border-2 border-[#BB86FC]'
                            }`}
                        style={{
                            textShadow: !isActive ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                            boxShadow: !isActive ? '0 0 20px rgba(187, 134, 252, 0.3)' : 'none'
                        }}
                    >
                        {isActive ? 'Test in Progress...' : isCompleted ? 'Start New Test' : 'Start Test'}
                    </button>
                </div>

                {/* Instructions */}
                {!isActive && (
                    <div className="text-center text-sm text-[#E0E0E0]/70 space-y-1 font-mono">
                        <p>Click "Start Test" to generate a new passage and begin typing.</p>
                        <p>Your typing speed and accuracy will be measured in real-time.</p>
                        <div className="mt-3 text-xs text-[#BB86FC]">
                            <p>• Green = correct character</p>
                            <p>• Red overlay = incorrect character (above crossed-out correct)</p>
                            <p>• Purple highlight = current cursor position</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Controls;
