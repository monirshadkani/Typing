/**
 * Enhanced Timer Component with Dark Theme
 * Features:
 * - Dark theme styling with glowing effects
 * - Precision timing display (tenths of seconds in final 10s)
 * - Animated progress ring with color transitions
 * - Status indicators with enhanced visibility
 */

import React from 'react';

interface TimerProps {
    timeLeft: number;
    totalTime: number;
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, isActive }) => {
    const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const showPrecision = timeLeft <= 10; // Show decimal precision when under 10 seconds

    const getTimerColor = (): string => {
        if (timeLeft <= 10) return 'text-[#F44336]';
        if (timeLeft <= 30) return 'text-[#FF9800]';
        return 'text-[#E0E0E0]';
    };

    const getProgressColor = (): string => {
        if (timeLeft <= 10) return '#F44336';
        if (timeLeft <= 30) return '#FF9800';
        return '#BB86FC';
    };

    const getGlowEffect = (): string => {
        if (timeLeft <= 10 && isActive) return 'animate-glow';
        return '';
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6">
            {/* Timer Display */}
            <div
                className={`text-6xl font-mono font-bold ${getTimerColor()} ${isActive && timeLeft <= 10 ? 'animate-pulse' : ''
                    } ${getGlowEffect()}`}
                style={{
                    fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                    textShadow: timeLeft <= 10 ? '0 0 20px rgba(244, 67, 54, 0.5)' : 'none'
                }}
            >
                {showPrecision ? (
                    // Show precise timing for final 10 seconds
                    `${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}.${Math.floor((seconds % 1) * 10)}`
                ) : (
                    // Standard minute:second display
                    `${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}`
                )}
            </div>

            {/* Enhanced Progress Ring */}
            <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="#333333"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke={getProgressColor()}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.1s linear',
                            filter: timeLeft <= 10 ? 'drop-shadow(0 0 5px rgba(244, 67, 54, 0.7))' : 'none'
                        }}
                    />
                </svg>

                {/* Center progress percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-[#E0E0E0] font-mono">
                            {Math.round(progress)}%
                        </span>
                        <div className="text-xs text-[#E0E0E0]/70 mt-1">
                            complete
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Status indicator */}
            <div className="flex items-center space-x-3 bg-[#2C2C2C] px-4 py-2 rounded-lg border border-[#404040]">
                <div
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${isActive
                        ? 'bg-[#4CAF50] animate-pulse shadow-lg'
                        : 'bg-[#666666]'
                        }`}
                    style={{
                        boxShadow: isActive ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none'
                    }}
                />
                <span className="text-sm text-[#E0E0E0] font-mono">
                    {isActive ? 'Test Active' : 'Test Paused'}
                </span>
                {isActive && timeLeft <= 10 && (
                    <span className="text-xs text-[#F44336] animate-pulse font-bold">
                        FINAL SECONDS
                    </span>
                )}
            </div>

            {/* Time remaining indicator */}
            <div className="text-center">
                <div className="text-xs text-[#E0E0E0]/50 font-mono">
                    {timeLeft > 0 ? `${timeLeft}s remaining` : 'Time\'s up!'}
                </div>
            </div>
        </div>
    );
};

export default Timer;
