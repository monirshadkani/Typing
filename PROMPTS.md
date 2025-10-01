System: You are a senior full-stack game developer specializing in typing-based educational games. You always deliver clean, production-ready code and explain your design choices step by step.

User: I want you to design and implement a typing practice + speed-test game that helps users type faster and more accurately.

Requirements (must follow exactly):

1) Core Features
- Display a randomly generated text passage for the user to type.
- Track input in real time and visually highlight per-character state:
  - Green = correct character
  - Red = incorrect character
  - Cursor position clearly shown
- Count and display:
  - Gross WPM = (total_characters_typed / 5) / minutes_elapsed
  - Net WPM = (correct_characters / 5) / minutes_elapsed
  - Total typos (see "Typo definitions")
  - Accuracy (%) = (correct_characters / total_characters_typed) * 100
- Timer options: selectable 30s, 60s, 120s
- Start button → generates passage and starts timer by default. Also provide an optional mode "start on first keystroke" (configurable).

2) Typo definitions (explicit)
- **Raw typos**: every keystroke that does not match the expected character at that moment (counts even if later corrected).
- **Uncorrected/final typos**: characters still incorrect when the timer ends (or at test submission).
- The UI and results should display both counts (raw & final).

3) Random text generation (no external APIs)
- Implement a built-in generator using a curated word bank and simple sentence templates:
  - Build sentences of random length (4–12 words).
  - Insert punctuation occasionally (commas, periods, question marks) with realistic spacing.
  - Capitalize sentence starts.
- The generator must produce a new, different passage each run and be deterministic under a seed for testing (optional).

4) UX & Accessibility
- Use a large, readable monospace or UI font for the typing area.
- Ensure keyboard focus on the input area on start.
- Ignore non-printable keys (Shift, Ctrl, Alt) and do not count them as typos.
- Make the UI responsive.

5) Output contract (deliver exactly these)
- 1) **Approach outline**: architecture, components list, state model, and formulas used.
- 2) **Full working code** in **React + Tailwind** (no extra libraries). Provide file names and folder layout (e.g., src/components/TypingTest.tsx, src/utils/textGenerator.ts).
- 3) **Explanations**: short comment block per component/file describing purpose and key functions.
- 4) **Run instructions**: exact commands to get the project running locally.
- 5) **One unit test** for the WPM calculation function (Jest or plain test function) and manual test checklist.
- 6) **Extension ideas**: short list of 6 practical next features (difficulty levels, score board, lessons, localization, mobile support, analytics).

6) Constraints & quality requirements
- Only React + Tailwind. No external UI or random-text libraries.
- Code must be modular, readable, well-named, and easy to extend.
- Keep components small and single-responsibility.
- Avoid long inline components; prefer separate files.

7) Self-check before final output
- At the end of your answer, produce a short checklist and confirm each required feature is implemented:
  - WPM (gross & net) ✅
  - Accuracy ✅
  - Raw and final typo counts ✅
  - Timer options ✅
  - Random text generator ✅
  - Start & restart flow ✅
- If anything is missing, fix it before delivering.

Goal: deliver a functional typing game with real-time feedback, random passages, configurable timer, and clear speed/accuracy metrics. If any requirement is unclear, ask one concise clarifying question; otherwise, proceed and deliver the full implementation and explanations.


-------------------------

The application did not compile, here is the error: Failed to compile.

Module not found: Error: Can't resolve './App' in 'C:\Users\monir\Documents\Projects\SN3\IAGenerative\src'
ERROR in ./src/index.tsx 7:0-24
Module not found: Error: Can't resolve './App' in 'C:\Users\monir\Documents\Projects\SN3\IAGenerative\src'

webpack compiled with 1 error

Identify the issue and fix it.



---------------------

The issue was fixed. However the texts are not generated correctly, the adjectives and nouns and verbs are not integrated. I see {noun} and {adjective} and {verb} in the text instead of the actual words. find the error and fix it.

-------------------


You are a senior full-stack developer. Update the typing practice game previously described. Your task is to replace the limited built-in word bank with the external source at:
https://github.com/dulldesk/words-api

Instructions:

1) Study the repository carefully before implementation. Understand how to query and retrieve words from it. Provide a short summary of how it works before writing code.

2) Replace the current text generation logic:
   - Default: use the words-api to fetch random words or phrases.
   - Use the built-in fallback word bank ONLY if:
     - The words-api is unavailable,
     - The response is invalid,
     - Or a fetch error occurs.

3) Integration requirements:
   - Create a separate utility module (e.g., `src/utils/textGenerator.ts`).
   - Ensure the generator still outputs realistic passages (random word length, punctuation, capitalization).
   - Allow seeding for reproducibility in tests.

4) Output contract:
   - Provide an updated **approach outline** showing how words-api is integrated with the fallback.
   - Provide updated **React + Tailwind code**, showing changes only where necessary (focus on text generation logic).
   - Show how to configure API calls (keys, endpoints, error handling).
   - Include error handling logic that falls back seamlessly.
   - Add a short **manual test checklist** for verifying that:
     1. Text is generated from words-api if available.
     2. Fallback is used when API is unreachable.

5) Constraints & quality:
   - Keep code modular, extendable, and well-documented.
   - Do not remove the fallback; it must always remain as backup.
   - Ensure UI/gameplay features (WPM, accuracy, typos, timer) remain unchanged.

6) Self-check:
   - Confirm at the end that words-api integration is working,
   - Fallback logic works,
   - And all original game features remain intact.

Goal: The game should now use the words-api for random text passages, with the built-in word bank as a safe fallback.

------------------

The timer does not work correctly, the second are much longer than 1 second sometimes. Create an accurate timer


----------------


System: You are a senior full-stack game developer specializing in typing-based educational games. You always deliver clean, production-ready code and explain your design choices step by step. Your designs must follow the provided dark theme style guide and advanced typo visualization rules.

User: I want you to design and implement a typing practice + speed-test game that helps users type faster and more accurately. The game must follow these rules:

Requirements:

1) Core Features
- Display a randomly generated text passage for the user to type.
- Track input in real time and visually highlight per-character state:
  - Green = correct character
  - Red = incorrect character
  - Cursor position clearly shown
- Count and display:
  - Gross WPM = (total_characters_typed / 5) / minutes_elapsed
  - Net WPM = (correct_characters / 5) / minutes_elapsed
  - Total typos (raw and uncorrected/final)
  - Accuracy (%) = (correct_characters / total_characters_typed) * 100
- Timer options: selectable 30s, 60s, 120s
- Start button → generates passage and starts timer by default; optional mode: "start on first keystroke"

2) Typo definitions (explicit)
- Raw typos: every keystroke that does not match the expected character at that moment
- Uncorrected/final typos: characters still incorrect when the timer ends
- Visualization: 
  - Correct character crossed out (gray, #888888)
  - Incorrect typed character displayed **above** the crossed-out correct character (red, #F44336)
  - Subtle bounce/fade-in animation

3) Random text generation
- Use the built-in word bank as fallback
- Optionally integrate words-api (https://github.com/dulldesk/words-api) to fetch random words
- Generate realistic passages: random word lengths (4-12 words), punctuation, capitalization
- Support seed for reproducibility in tests

4) Dark Theme Style Guide
- Background: #121212
- Default text: #E0E0E0
- Correct typed: #4CAF50
- Incorrect typed above crossed-out: #F44336
- Highlight current char: #BB86FC
- Cursor: #FFFFFF, blinking
- Buttons: #1F1F1F, hover #333333, border-radius 5px
- Stats panel: #2C2C2C, soft shadow, padding 0.5rem 1rem
- Font: monospace ('Fira Code' or 'Roboto Mono'), readable size (~19px main, 16px stats/buttons)
- Line spacing 1.5x

5) UX / Layout
- Centered text area, max-width 800px, padding 1rem
- Stats panel above typing area
- Buttons below typing area, horizontally spaced 1rem
- Focus input area on start
- Ignore non-printable keys (Shift, Ctrl, Alt)

6) Output Contract
- Provide:
  1. Approach outline (architecture, components list, state model, formulas)
  2. Full working code in React + Tailwind (modular, extendable, self-explanatory variable names)
  3. Explanations for each component/file
  4. Run instructions
  5. Manual test checklist: verify WPM, accuracy, raw/final typos, timer, restart, typo visualization
  6. Extension ideas: 5-6 practical future features

7) Constraints & Quality
- Only React + Tailwind (no extra libraries unless words-api is integrated)
- Keep code modular and readable
- Maintain all original game features

8) Self-check
- At the end, produce a short checklist confirming:
  - WPM (gross & net) ✅
  - Accuracy ✅
  - Raw/final typos ✅
  - Timer options ✅
  - Random text generator ✅
  - Start & restart flow ✅
  - Dark theme & typo visualization implemented ✅
- Fix any missing features or errors before final delivery

Goal: A fully functional typing game with **real-time feedback, random passages, configurable timer, dark theme, and advanced typo visualization**. If any requirement is unclear, ask one concise clarifying question before proceeding.