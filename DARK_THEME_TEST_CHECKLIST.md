# Dark Theme Typing Speed Test - Manual Test Checklist

## Pre-Test Setup
- [ ] Ensure React development server is running (`npm start`)
- [ ] Open application in browser at `http://localhost:3000`
- [ ] Verify dark theme is applied immediately (background #121212)
- [ ] Check that all fonts are monospace (Fira Code/Roboto Mono)

## 1. Visual Theme Verification ✅

### Dark Theme Colors
- [ ] **Background**: #121212 (deep dark)
- [ ] **Default text**: #E0E0E0 (light gray)
- [ ] **Correct characters**: #4CAF50 (green)
- [ ] **Incorrect characters**: #F44336 (red, displayed above crossed-out)
- [ ] **Current cursor**: #BB86FC (purple highlight)
- [ ] **Cursor indicator**: #FFFFFF (white, blinking)
- [ ] **Button backgrounds**: #1F1F1F with hover #333333
- [ ] **Stats panels**: #2C2C2C with soft shadows

### Typography & Spacing
- [ ] **Main text**: 19px monospace font
- [ ] **Stats/buttons**: 16px font size
- [ ] **Line spacing**: 1.5x throughout
- [ ] **Border radius**: 5px on buttons and panels
- [ ] **Max width**: 800px for centered text area
- [ ] **Padding**: 1rem around main content areas

## 2. Advanced Typo Visualization ✅

### Character State Display
- [ ] **Correct characters**: Green background with subtle glow
- [ ] **Incorrect characters**: Gray crossed-out with red overlay above
- [ ] **Cursor position**: Purple highlight with blinking white cursor
- [ ] **Untyped characters**: Default light gray text

### Animation Effects
- [ ] **Typo overlay**: Bounces in with fade animation when error occurs
- [ ] **Character transitions**: Smooth 200ms color transitions
- [ ] **Cursor blinking**: 1-second blink cycle
- [ ] **Button interactions**: Scale effects on hover/click

### Error Visualization
- [ ] Red characters appear **above** crossed-out correct characters
- [ ] Space character errors show as "␣" symbol
- [ ] Multiple errors stack properly without overlap
- [ ] Animations are smooth and not distracting

## 3. Core Functionality Testing ✅

### WPM Calculations
- [ ] **Gross WPM**: (total_characters_typed / 5) / minutes_elapsed
- [ ] **Net WPM**: (correct_characters / 5) / minutes_elapsed
- [ ] Live WPM updates during typing (purple color)
- [ ] Final WPM matches manual calculation

### Accuracy Tracking
- [ ] **Accuracy formula**: (correct_characters / total_characters_typed) * 100
- [ ] Live accuracy updates (green color)
- [ ] Shows 100% before any typing
- [ ] Decreases appropriately with errors

### Typo Counting
- [ ] **Raw typos**: Every incorrect keystroke counted (red color)
- [ ] **Final typos**: Errors remaining at test end
- [ ] Raw count increases with each mistake
- [ ] Final count matches visual errors at completion

## 4. Timer Functionality ✅

### Timer Options
- [ ] **30-second option**: Works correctly
- [ ] **60-second option**: Works correctly (default)
- [ ] **120-second option**: Works correctly
- [ ] Timer selection disabled during active test

### Timer Accuracy
- [ ] Countdown matches real-time (no drift)
- [ ] Sub-second precision in final 10 seconds (shows tenths)
- [ ] Progress ring updates smoothly
- [ ] Timer continues accurately when tab is inactive

### Timer Visual Effects
- [ ] **Normal time**: White/gray display
- [ ] **Warning (≤30s)**: Orange color
- [ ] **Critical (≤10s)**: Red color with glow effect
- [ ] **Final seconds**: "FINAL SECONDS" indicator appears

## 5. Start Modes Testing ✅

### Immediate Start Mode
- [ ] Timer starts immediately on "Start Test" click
- [ ] Test becomes active right away
- [ ] Input field receives focus automatically

### Start on First Keystroke Mode
- [ ] Timer remains paused after "Start Test" click
- [ ] Timer starts on first character typed
- [ ] Transition is smooth and immediate

## 6. Random Text Generation ✅

### Text Quality
- [ ] Passages are realistic and readable
- [ ] Proper capitalization at sentence starts
- [ ] Appropriate punctuation (periods, commas, question marks)
- [ ] Word lengths vary (4-12 words per sentence)
- [ ] No placeholder tokens ({noun}, {verb}, etc.)

### API Integration
- [ ] Text generates from words-api when available
- [ ] Falls back to built-in word bank if API fails
- [ ] Generation is reasonably fast (<2 seconds)
- [ ] Each test produces different text

## 7. User Experience ✅

### Layout & Responsiveness
- [ ] Centered layout with proper spacing
- [ ] Responsive design works on different screen sizes
- [ ] Text area has max-width constraint (800px)
- [ ] Stats panel positioned above typing area
- [ ] Buttons positioned below with 1rem spacing

### Keyboard Interaction
- [ ] Input focus maintained during typing
- [ ] Non-printable keys ignored (Shift, Ctrl, Alt, arrows)
- [ ] Backspace works correctly
- [ ] Tab key doesn't interfere with typing

### Visual Feedback
- [ ] Progress bar shows completion percentage
- [ ] Character count display is accurate
- [ ] Live stats update smoothly during typing
- [ ] Error count shows in real-time

## 8. Results Display ✅

### Performance Cards
- [ ] **Net WPM**: Prominently displayed with rating
- [ ] **Gross WPM**: Shows total typing speed
- [ ] **Accuracy**: Color-coded percentage
- [ ] **Time Elapsed**: Actual test duration

### Detailed Analysis
- [ ] **Error Analysis**: Raw vs final typos with explanations
- [ ] **Performance Breakdown**: Character counts and rates
- [ ] **Formula Explanations**: Clear calculation methods
- [ ] **Visual Indicators**: Color-coded sections with icons

### Results Actions
- [ ] "Take Another Test" button works correctly
- [ ] Returns to main interface cleanly
- [ ] Resets all state properly

## 9. Edge Cases & Error Handling ✅

### Network Issues
- [ ] Works offline (uses built-in word bank)
- [ ] Graceful API fallback when words-api unavailable
- [ ] No errors or blank screens during network issues

### Typing Edge Cases
- [ ] Very fast typing doesn't break calculations
- [ ] Very slow typing maintains accuracy
- [ ] Typing beyond text length is prevented
- [ ] Rapid backspacing works correctly

### Timer Edge Cases
- [ ] Timer accuracy maintained under system load
- [ ] Works correctly when browser tab loses focus
- [ ] Proper handling when test completes early (all text typed)

## 10. Performance & Accessibility ✅

### Performance
- [ ] Smooth 60fps animations
- [ ] No lag during rapid typing
- [ ] Memory usage remains stable
- [ ] No console errors or warnings

### Accessibility
- [ ] High contrast colors for readability
- [ ] Keyboard navigation works properly
- [ ] Screen reader compatible (semantic HTML)
- [ ] Focus indicators are visible

## 11. Extension Ideas Verification ✅

### Implemented Features Ready for Extension
- [ ] Modular component architecture supports additions
- [ ] State management can handle additional complexity
- [ ] API integration foundation for more data sources
- [ ] Theme system ready for customization
- [ ] Statistics tracking ready for historical data
- [ ] Text generation ready for difficulty levels

---

## Final Verification Checklist

### Core Requirements Met
- [ ] **WPM (gross & net)** ✅ - Accurate calculations with live updates
- [ ] **Accuracy** ✅ - Real-time percentage tracking
- [ ] **Raw and final typos** ✅ - Both counts displayed with definitions
- [ ] **Timer options** ✅ - 30s/60s/120s with precision timing
- [ ] **Random text generator** ✅ - API + fallback system
- [ ] **Start & restart flow** ✅ - Both start modes functional
- [ ] **Dark theme** ✅ - Complete implementation with specified colors
- [ ] **Advanced typo visualization** ✅ - Red overlays above crossed-out characters

### Quality Standards Met
- [ ] **Clean, production-ready code** ✅
- [ ] **Modular React components** ✅
- [ ] **Responsive Tailwind styling** ✅
- [ ] **Professional typography** ✅
- [ ] **Smooth animations** ✅
- [ ] **Error handling** ✅

---

**Test Date**: ___________  
**Tester**: ___________  
**Overall Result**: ___________  
**Notes**: ___________
