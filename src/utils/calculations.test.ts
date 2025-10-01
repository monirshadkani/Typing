/**
 * Unit tests for typing calculation functions
 * Tests WPM calculations, accuracy, and typo counting
 */

import {
  calculateGrossWPM,
  calculateNetWPM,
  calculateAccuracy,
  countFinalTypos,
  countCorrectCharacters,
  calculateTypingStats,
  CharacterState,
  getCharacterStates
} from './calculations';

describe('Typing Calculations', () => {
  describe('calculateGrossWPM', () => {
    it('should calculate gross WPM correctly', () => {
      // Test case: 50 characters typed in 1 minute (60000ms)
      expect(calculateGrossWPM(50, 60000)).toBe(10); // (50/5)/1 = 10 WPM
      
      // Test case: 100 characters typed in 2 minutes (120000ms)
      expect(calculateGrossWPM(100, 120000)).toBe(10); // (100/5)/2 = 10 WPM
      
      // Test case: 75 characters typed in 30 seconds (30000ms)
      expect(calculateGrossWPM(75, 30000)).toBe(30); // (75/5)/0.5 = 30 WPM
      
      // Edge case: zero time should return 0
      expect(calculateGrossWPM(50, 0)).toBe(0);
      
      // Edge case: negative time should return 0
      expect(calculateGrossWPM(50, -1000)).toBe(0);
    });
  });

  describe('calculateNetWPM', () => {
    it('should calculate net WPM correctly', () => {
      // Test case: 40 correct characters out of 50 typed in 1 minute
      expect(calculateNetWPM(40, 60000)).toBe(8); // (40/5)/1 = 8 WPM
      
      // Test case: 80 correct characters in 2 minutes
      expect(calculateNetWPM(80, 120000)).toBe(8); // (80/5)/2 = 8 WPM
      
      // Test case: 60 correct characters in 30 seconds
      expect(calculateNetWPM(60, 30000)).toBe(24); // (60/5)/0.5 = 24 WPM
      
      // Edge case: zero time should return 0
      expect(calculateNetWPM(40, 0)).toBe(0);
    });
  });

  describe('calculateAccuracy', () => {
    it('should calculate accuracy percentage correctly', () => {
      // Test case: 40 correct out of 50 total
      expect(calculateAccuracy(40, 50)).toBe(80); // (40/50)*100 = 80%
      
      // Test case: perfect accuracy
      expect(calculateAccuracy(50, 50)).toBe(100); // (50/50)*100 = 100%
      
      // Test case: zero accuracy
      expect(calculateAccuracy(0, 50)).toBe(0); // (0/50)*100 = 0%
      
      // Edge case: no characters typed should return 100%
      expect(calculateAccuracy(0, 0)).toBe(100);
    });
  });

  describe('countFinalTypos', () => {
    it('should count final typos correctly', () => {
      // Test case: some incorrect characters
      expect(countFinalTypos('hello wrold', 'hello world')).toBe(1); // 'r' vs 'r', 'o' vs 'o', 'l' vs 'r'
      
      // Test case: perfect typing
      expect(countFinalTypos('hello world', 'hello world')).toBe(0);
      
      // Test case: incomplete typing (untyped characters count as typos)
      expect(countFinalTypos('hello', 'hello world')).toBe(6); // missing ' world'
      
      // Test case: multiple errors
      expect(countFinalTypos('hxllo wxrld', 'hello world')).toBe(2); // 'x' vs 'e', 'x' vs 'o'
    });
  });

  describe('countCorrectCharacters', () => {
    it('should count correct characters correctly', () => {
      // Test case: mostly correct
      expect(countCorrectCharacters('hello wrold', 'hello world')).toBe(9); // 'hello wr' + 'ld' = 9 correct
      
      // Test case: perfect typing
      expect(countCorrectCharacters('hello world', 'hello world')).toBe(11);
      
      // Test case: incomplete typing
      expect(countCorrectCharacters('hello', 'hello world')).toBe(5);
      
      // Test case: completely wrong
      expect(countCorrectCharacters('xxxxx', 'hello')).toBe(0);
    });
  });

  describe('getCharacterStates', () => {
    it('should return correct character states for highlighting', () => {
      const userInput = 'helo';
      const originalText = 'hello world';
      const currentIndex = 4;
      
      const states = getCharacterStates(userInput, originalText, currentIndex);
      
      expect(states[0]).toBe(CharacterState.CORRECT); // 'h'
      expect(states[1]).toBe(CharacterState.CORRECT); // 'e'
      expect(states[2]).toBe(CharacterState.CORRECT); // 'l'
      expect(states[3]).toBe(CharacterState.INCORRECT); // 'o' vs 'l'
      expect(states[4]).toBe(CharacterState.CURSOR); // cursor position
      expect(states[5]).toBe(CharacterState.UNTYPED); // not yet typed
    });
  });

  describe('calculateTypingStats', () => {
    it('should calculate comprehensive typing statistics', () => {
      const userInput = 'hello wrold test';
      const originalText = 'hello world test';
      const rawTypos = 3; // simulated raw typos during typing
      const timeElapsed = 60000; // 1 minute
      
      const stats = calculateTypingStats(userInput, originalText, rawTypos, timeElapsed);
      
      expect(stats.totalCharactersTyped).toBe(16);
      expect(stats.correctCharacters).toBe(15); // all correct except 'r' vs 'o'
      expect(stats.grossWPM).toBe(3); // (16/5)/1 = 3.2 rounded to 3
      expect(stats.netWPM).toBe(3); // (15/5)/1 = 3
      expect(stats.accuracy).toBe(94); // (15/16)*100 = 93.75 rounded to 94
      expect(stats.rawTypos).toBe(3);
      expect(stats.finalTypos).toBe(1); // only 'r' vs 'o' remains wrong
      expect(stats.timeElapsed).toBe(60); // 60 seconds
    });

    it('should handle edge cases correctly', () => {
      // Test with no input
      const stats1 = calculateTypingStats('', 'hello world', 0, 60000);
      expect(stats1.grossWPM).toBe(0);
      expect(stats1.netWPM).toBe(0);
      expect(stats1.accuracy).toBe(100); // no characters typed = 100% accuracy
      expect(stats1.finalTypos).toBe(11); // all characters untyped
      
      // Test with zero time
      const stats2 = calculateTypingStats('hello', 'hello', 0, 0);
      expect(stats2.grossWPM).toBe(0);
      expect(stats2.netWPM).toBe(0);
    });
  });
});

// Manual test function for browser console testing
export const runManualTests = () => {
  console.log('=== Manual WPM Calculation Tests ===');
  
  console.log('Test 1: Basic WPM calculation');
  console.log('50 chars in 60s:', calculateGrossWPM(50, 60000), 'WPM (expected: 10)');
  
  console.log('Test 2: Net WPM with errors');
  console.log('40 correct chars in 60s:', calculateNetWPM(40, 60000), 'WPM (expected: 8)');
  
  console.log('Test 3: Accuracy calculation');
  console.log('40/50 correct:', calculateAccuracy(40, 50), '% (expected: 80)');
  
  console.log('Test 4: Final typos');
  console.log('Final typos in "helo" vs "hello":', countFinalTypos('helo', 'hello'), '(expected: 1)');
  
  console.log('=== All manual tests completed ===');
};
