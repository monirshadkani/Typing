/**
 * Enhanced Results Component with Dark Theme
 * Features:
 * - Dark theme styling with glowing effects
 * - Advanced performance breakdown with visual indicators
 * - Professional typography and spacing
 * - Comprehensive statistics display
 */

import React from 'react';
import { TypingStats } from '../utils/calculations';

interface ResultsProps {
    stats: TypingStats;
    onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ stats, onRestart }) => {
    const getAccuracyColor = (accuracy: number): string => {
        if (accuracy >= 95) return 'text-[#4CAF50]';
        if (accuracy >= 85) return 'text-[#FF9800]';
        return 'text-[#F44336]';
    };

    const getAccuracyBg = (accuracy: number): string => {
        if (accuracy >= 95) return 'bg-[#4CAF50]/10 border-[#4CAF50]/30';
        if (accuracy >= 85) return 'bg-[#FF9800]/10 border-[#FF9800]/30';
        return 'bg-[#F44336]/10 border-[#F44336]/30';
    };

    const getWPMRating = (wpm: number): { rating: string; color: string; bg: string } => {
        if (wpm >= 70) return { rating: 'Excellent', color: 'text-[#4CAF50]', bg: 'bg-[#4CAF50]/10 border-[#4CAF50]/30' };
        if (wpm >= 50) return { rating: 'Good', color: 'text-[#2196F3]', bg: 'bg-[#2196F3]/10 border-[#2196F3]/30' };
        if (wpm >= 30) return { rating: 'Average', color: 'text-[#FF9800]', bg: 'bg-[#FF9800]/10 border-[#FF9800]/30' };
        if (wpm >= 15) return { rating: 'Beginner', color: 'text-[#FF5722]', bg: 'bg-[#FF5722]/10 border-[#FF5722]/30' };
        return { rating: 'Practice More', color: 'text-[#F44336]', bg: 'bg-[#F44336]/10 border-[#F44336]/30' };
    };

    const wpmRating = getWPMRating(stats.netWPM);

    return (
        <div className="min-h-screen bg-[#121212] py-8">
            <div className="w-full max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-[#E0E0E0] mb-4 font-mono">
                        <span className="text-[#4CAF50]">Test</span>{' '}
                        <span className="text-[#BB86FC]">Complete!</span>
                    </h2>
                    <p className="text-[#E0E0E0]/70 text-lg font-mono">
                        Here are your professional typing results
                    </p>
                </div>

                {/* Main Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Net WPM */}
                    <div className={`${wpmRating.bg} border p-8 rounded-lg text-center relative overflow-hidden`}>
                        <div className="relative z-10">
                            <div className={`text-5xl font-bold ${wpmRating.color} mb-3 font-mono`}>
                                {stats.netWPM}
                            </div>
                            <div className="text-sm font-medium text-[#E0E0E0] mb-2 font-mono">Net WPM</div>
                            <div className={`text-xs font-semibold ${wpmRating.color} px-3 py-1 rounded-full bg-[#2C2C2C] border border-current/30`}>
                                {wpmRating.rating}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
                    </div>

                    {/* Gross WPM */}
                    <div className="bg-[#BB86FC]/10 border border-[#BB86FC]/30 p-8 rounded-lg text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-5xl font-bold text-[#BB86FC] mb-3 font-mono">{stats.grossWPM}</div>
                            <div className="text-sm font-medium text-[#E0E0E0] mb-2 font-mono">Gross WPM</div>
                            <div className="text-xs text-[#BB86FC]/80 px-3 py-1 rounded-full bg-[#2C2C2C] border border-[#BB86FC]/30 font-mono">
                                Total Speed
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
                    </div>

                    {/* Accuracy */}
                    <div className={`${getAccuracyBg(stats.accuracy)} border p-8 rounded-lg text-center relative overflow-hidden`}>
                        <div className="relative z-10">
                            <div className={`text-5xl font-bold mb-3 font-mono ${getAccuracyColor(stats.accuracy)}`}>
                                {stats.accuracy}%
                            </div>
                            <div className="text-sm font-medium text-[#E0E0E0] mb-2 font-mono">Accuracy</div>
                            <div className="text-xs text-[#E0E0E0]/70 px-3 py-1 rounded-full bg-[#2C2C2C] border border-current/30 font-mono">
                                {stats.correctCharacters}/{stats.totalCharactersTyped} chars
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
                    </div>

                    {/* Time */}
                    <div className="bg-[#FF9800]/10 border border-[#FF9800]/30 p-8 rounded-lg text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-5xl font-bold text-[#FF9800] mb-3 font-mono">{stats.timeElapsed}s</div>
                            <div className="text-sm font-medium text-[#E0E0E0] mb-2 font-mono">Time Elapsed</div>
                            <div className="text-xs text-[#FF9800]/80 px-3 py-1 rounded-full bg-[#2C2C2C] border border-[#FF9800]/30 font-mono">
                                Duration
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
                    </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Error Analysis */}
                    <div className="bg-[#2C2C2C] border border-[#404040] p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold text-[#F44336] mb-6 font-mono flex items-center">
                            <span className="w-3 h-3 bg-[#F44336] rounded-full mr-3"></span>
                            Error Analysis
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-[#F44336]/5 rounded-lg border border-[#F44336]/20">
                                <div>
                                    <span className="text-[#E0E0E0] font-mono">Raw Typos:</span>
                                    <div className="text-xs text-[#E0E0E0]/60 mt-1 font-mono">
                                        Every incorrect keystroke (including corrected)
                                    </div>
                                </div>
                                <span className="text-3xl font-bold text-[#F44336] font-mono">{stats.rawTypos}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-[#F44336]/5 rounded-lg border border-[#F44336]/20">
                                <div>
                                    <span className="text-[#E0E0E0] font-mono">Final Typos:</span>
                                    <div className="text-xs text-[#E0E0E0]/60 mt-1 font-mono">
                                        Errors remaining at test end
                                    </div>
                                </div>
                                <span className="text-3xl font-bold text-[#F44336] font-mono">{stats.finalTypos}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-[#FF9800]/5 rounded-lg border border-[#FF9800]/20">
                                <div>
                                    <span className="text-[#E0E0E0] font-mono">Error Rate:</span>
                                    <div className="text-xs text-[#E0E0E0]/60 mt-1 font-mono">
                                        Percentage of incorrect keystrokes
                                    </div>
                                </div>
                                <span className="text-3xl font-bold text-[#FF9800] font-mono">
                                    {stats.totalCharactersTyped > 0 ?
                                        Math.round((stats.rawTypos / stats.totalCharactersTyped) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Performance Breakdown */}
                    <div className="bg-[#2C2C2C] border border-[#404040] p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold text-[#4CAF50] mb-6 font-mono flex items-center">
                            <span className="w-3 h-3 bg-[#4CAF50] rounded-full mr-3"></span>
                            Performance
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-[#4CAF50]/5 rounded-lg border border-[#4CAF50]/20">
                                <span className="text-[#E0E0E0] font-mono">Characters Typed:</span>
                                <span className="text-3xl font-bold text-[#4CAF50] font-mono">{stats.totalCharactersTyped}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-[#4CAF50]/5 rounded-lg border border-[#4CAF50]/20">
                                <span className="text-[#E0E0E0] font-mono">Correct Characters:</span>
                                <span className="text-3xl font-bold text-[#4CAF50] font-mono">{stats.correctCharacters}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-[#BB86FC]/5 rounded-lg border border-[#BB86FC]/20">
                                <span className="text-[#E0E0E0] font-mono">Typing Speed:</span>
                                <span className="text-3xl font-bold text-[#BB86FC] font-mono">
                                    {Math.round((stats.totalCharactersTyped / stats.timeElapsed) * 60)} CPM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formula Explanations */}
                <div className="bg-[#2C2C2C] border border-[#404040] p-8 rounded-lg mb-12">
                    <h3 className="text-2xl font-semibold text-[#BB86FC] mb-6 font-mono flex items-center">
                        <span className="w-3 h-3 bg-[#BB86FC] rounded-full mr-3"></span>
                        Calculation Methods
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#E0E0E0]/80 font-mono">
                        <div className="p-4 bg-[#121212] rounded-lg border border-[#333333]">
                            <strong className="text-[#BB86FC]">Gross WPM:</strong> (Total characters ÷ 5) ÷ Minutes
                        </div>
                        <div className="p-4 bg-[#121212] rounded-lg border border-[#333333]">
                            <strong className="text-[#4CAF50]">Net WPM:</strong> (Correct characters ÷ 5) ÷ Minutes
                        </div>
                        <div className="p-4 bg-[#121212] rounded-lg border border-[#333333]">
                            <strong className="text-[#FF9800]">Accuracy:</strong> (Correct ÷ Total typed) × 100%
                        </div>
                        <div className="p-4 bg-[#121212] rounded-lg border border-[#333333]">
                            <strong className="text-[#F44336]">Raw Typos:</strong> Every incorrect keystroke
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                    <button
                        onClick={onRestart}
                        className="bg-[#BB86FC] hover:bg-[#9C27B0] text-[#121212] font-semibold py-4 px-12 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-offset-2 focus:ring-offset-[#121212] hover:scale-110 active:scale-95 font-mono text-lg border-2 border-[#BB86FC]"
                        style={{
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            boxShadow: '0 0 30px rgba(187, 134, 252, 0.4)'
                        }}
                    >
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;