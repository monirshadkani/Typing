/**
 * Typing test calculation utilities
 * Handles WPM, accuracy, and typo counting with precise formulas
 */

export interface TypingStats {
  grossWPM: number;
  netWPM: number;
  accuracy: number;
  rawTypos: number;
  finalTypos: number;
  totalCharactersTyped: number;
  correctCharacters: number;
  timeElapsed: number;
}

/**
 * Calculate gross WPM (Words Per Minute)
 * Formula: (total_characters_typed / 5) / minutes_elapsed
 */
export function calculateGrossWPM(totalCharactersTyped: number, timeElapsedMs: number): number {
  if (timeElapsedMs <= 0) return 0;
  const minutes = timeElapsedMs / (1000 * 60);
  return Math.round((totalCharactersTyped / 5) / minutes);
}

/**
 * Calculate net WPM (Words Per Minute)
 * Formula: (correct_characters / 5) / minutes_elapsed
 */
export function calculateNetWPM(correctCharacters: number, timeElapsedMs: number): number {
  if (timeElapsedMs <= 0) return 0;
  const minutes = timeElapsedMs / (1000 * 60);
  return Math.round((correctCharacters / 5) / minutes);
}

/**
 * Calculate accuracy percentage
 * Formula: (correct_characters / total_characters_typed) * 100
 */
export function calculateAccuracy(correctCharacters: number, totalCharactersTyped: number): number {
  if (totalCharactersTyped <= 0) return 100;
  return Math.round((correctCharacters / totalCharactersTyped) * 100);
}

/**
 * Count raw typos - every keystroke that doesn't match expected character
 */
export function countRawTypos(userInput: string, originalText: string): number {
  // This should be tracked in real-time during typing, not calculated retrospectively
  // This function is for validation/testing purposes
  let rawTypos = 0;
  const minLength = Math.min(userInput.length, originalText.length);
  
  for (let i = 0; i < minLength; i++) {
    if (userInput[i] !== originalText[i]) {
      rawTypos++;
    }
  }
  
  return rawTypos;
}

/**
 * Count final typos - characters still incorrect at the end
 */
export function countFinalTypos(userInput: string, originalText: string): number {
  let finalTypos = 0;
  const minLength = Math.min(userInput.length, originalText.length);
  
  // Count mismatched characters
  for (let i = 0; i < minLength; i++) {
    if (userInput[i] !== originalText[i]) {
      finalTypos++;
    }
  }
  
  // Add untyped characters as typos if user didn't complete the text
  if (userInput.length < originalText.length) {
    finalTypos += originalText.length - userInput.length;
  }
  
  return finalTypos;
}

/**
 * Count correct characters typed
 */
export function countCorrectCharacters(userInput: string, originalText: string): number {
  let correct = 0;
  const minLength = Math.min(userInput.length, originalText.length);
  
  for (let i = 0; i < minLength; i++) {
    if (userInput[i] === originalText[i]) {
      correct++;
    }
  }
  
  return correct;
}

/**
 * Calculate comprehensive typing statistics
 */
export function calculateTypingStats(
  userInput: string,
  originalText: string,
  rawTyposCount: number,
  timeElapsedMs: number
): TypingStats {
  const totalCharactersTyped = userInput.length;
  const correctCharacters = countCorrectCharacters(userInput, originalText);
  const finalTypos = countFinalTypos(userInput, originalText);
  
  return {
    grossWPM: calculateGrossWPM(totalCharactersTyped, timeElapsedMs),
    netWPM: calculateNetWPM(correctCharacters, timeElapsedMs),
    accuracy: calculateAccuracy(correctCharacters, totalCharactersTyped),
    rawTypos: rawTyposCount,
    finalTypos: finalTypos,
    totalCharactersTyped,
    correctCharacters,
    timeElapsed: Math.round(timeElapsedMs / 1000)
  };
}

/**
 * Character state for visual highlighting
 */
export enum CharacterState {
  UNTYPED = 'untyped',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  CURSOR = 'cursor'
}

/**
 * Get character states for visual highlighting
 */
export function getCharacterStates(userInput: string, originalText: string, currentIndex: number): CharacterState[] {
  const states: CharacterState[] = [];
  
  for (let i = 0; i < originalText.length; i++) {
    if (i < userInput.length) {
      // Character has been typed
      states.push(userInput[i] === originalText[i] ? CharacterState.CORRECT : CharacterState.INCORRECT);
    } else if (i === currentIndex) {
      // Current cursor position
      states.push(CharacterState.CURSOR);
    } else {
      // Not yet typed
      states.push(CharacterState.UNTYPED);
    }
  }
  
  return states;
}
