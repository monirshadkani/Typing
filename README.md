# Typing Speed Test Game

A comprehensive typing practice and speed test application built with React and TypeScript. Test your typing speed and accuracy with randomly generated text passages, real-time feedback, and detailed performance analytics.

## Features

### Core Functionality
- **Random Text Generation**: Built-in text generator with curated word banks and sentence templates
- **Real-time Character Highlighting**: 
  - 🟢 Green = correct character
  - 🔴 Red = incorrect character  
  - 🔵 Blue cursor = current position
- **Comprehensive Metrics**:
  - Gross WPM: `(total_characters_typed / 5) / minutes_elapsed`
  - Net WPM: `(correct_characters / 5) / minutes_elapsed`
  - Accuracy: `(correct_characters / total_characters_typed) * 100`
  - Raw typos: Every incorrect keystroke (including corrected)
  - Final typos: Errors remaining at test end

### Customization Options
- **Timer Durations**: 30s, 60s, or 120s tests
- **Start Modes**: 
  - Immediate start (timer begins on button click)
  - Start on first keystroke (timer begins when typing starts)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Experience
- Large, readable monospace font for optimal typing experience
- Progress indicator showing completion percentage
- Live statistics during active tests
- Detailed results breakdown with performance analysis
- Keyboard focus management and accessibility features

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Running Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Building for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TypingTest.tsx      # Main container component
│   ├── TextDisplay.tsx     # Text with character highlighting
│   ├── InputArea.tsx       # Hidden input field for typing
│   ├── Timer.tsx           # Countdown timer with progress ring
│   ├── Results.tsx         # Post-test statistics display
│   └── Controls.tsx        # Start button and configuration
├── utils/
│   ├── textGenerator.ts    # Random text generation engine
│   ├── calculations.ts     # WPM, accuracy, and typo calculations
│   └── calculations.test.ts # Unit tests for calculations
├── App.tsx                 # Main app component
├── App.css                 # Global styles and Tailwind imports
└── index.tsx              # React app entry point
```

## How to Use

1. **Configure Your Test**:
   - Select timer duration (30s, 60s, or 120s)
   - Choose start mode (immediate or on first keystroke)

2. **Start the Test**:
   - Click "Start Test" to generate a new passage
   - Begin typing the displayed text
   - Watch real-time feedback as you type

3. **View Results**:
   - Comprehensive statistics after test completion
   - Performance breakdown and error analysis
   - Click "Take Another Test" to try again

## Technical Implementation

### Text Generation Algorithm
- Uses curated word banks organized by frequency and type
- Generates realistic sentences with proper punctuation
- Supports deterministic generation with optional seed
- Adjusts passage length based on selected timer duration

### Real-time Calculation Engine
- Character-by-character comparison for instant feedback
- Precise WPM formulas following industry standards
- Distinguishes between raw typos and final errors
- Optimized for smooth 60fps performance

### Accessibility Features
- Keyboard navigation support
- Screen reader compatible
- High contrast color schemes
- Focus management during tests

## Manual Test Checklist

### Basic Functionality
- [ ] Text generates randomly on each test start
- [ ] Characters highlight correctly (green/red/cursor)
- [ ] Timer counts down accurately for all durations
- [ ] Test completes when timer reaches zero
- [ ] Test completes when all text is typed

### Metrics Validation
- [ ] Gross WPM calculation matches formula
- [ ] Net WPM accounts for errors correctly  
- [ ] Accuracy percentage is accurate
- [ ] Raw typos count every incorrect keystroke
- [ ] Final typos count remaining errors

### User Interface
- [ ] Responsive design works on different screen sizes
- [ ] Start modes function as expected
- [ ] Keyboard focus stays on input during test
- [ ] Progress indicator updates smoothly
- [ ] Results display comprehensive statistics

### Edge Cases
- [ ] Zero characters typed shows 100% accuracy
- [ ] Very fast typing doesn't break calculations
- [ ] Backspace doesn't count as typo
- [ ] Non-printable keys ignored (Shift, Ctrl, etc.)

## Extension Ideas

1. **Difficulty Levels**: Add beginner/intermediate/advanced text complexity
2. **Score Board**: Local storage leaderboard with best scores
3. **Typing Lessons**: Structured lessons for specific skills (numbers, symbols, etc.)
4. **Localization**: Support for different languages and keyboard layouts  
5. **Mobile Support**: Touch-friendly interface with virtual keyboard
6. **Analytics Dashboard**: Historical performance tracking and improvement charts

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS 3
- **Testing**: Jest with React Testing Library
- **Build Tool**: Create React App
- **Code Quality**: ESLint + TypeScript strict mode

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Happy Typing! 🚀**
