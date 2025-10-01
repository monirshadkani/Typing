# Words-API Integration Test Checklist

## Pre-Test Setup
- [ ] Ensure React development server is running (`npm start`)
- [ ] Open browser developer console to monitor API calls and fallbacks
- [ ] Clear browser cache and localStorage if needed

## Test 1: API Integration (Normal Operation)
**Objective**: Verify text is generated from words-api when available

### Steps:
1. [ ] Open the typing test application
2. [ ] Click "Start Test" 
3. [ ] Check browser console for API requests to words-api endpoints
4. [ ] Verify generated text contains diverse vocabulary (not just basic words)
5. [ ] Note any cache hits in console logs
6. [ ] Start multiple tests to verify API caching is working

### Expected Results:
- [ ] Console shows API requests to words-api endpoints
- [ ] Generated sentences use varied, sophisticated vocabulary
- [ ] Subsequent requests use cached data (faster generation)
- [ ] No placeholder `{noun}`, `{verb}`, `{adjective}` tokens visible
- [ ] Text maintains proper sentence structure and punctuation

## Test 2: API Fallback (Simulated Network Issues)
**Objective**: Verify fallback to built-in word bank when API fails

### Steps:
1. [ ] Open browser Developer Tools → Network tab
2. [ ] Enable "Offline" mode or block requests to `github.com`
3. [ ] Click "Start Test"
4. [ ] Check console for API failure messages and fallback activation
5. [ ] Verify text is still generated using built-in word bank
6. [ ] Test multiple times to ensure consistency

### Expected Results:
- [ ] Console shows API timeout/failure messages
- [ ] Console shows "falling back to synchronous" messages
- [ ] Text is still generated successfully
- [ ] Generated text uses simpler, built-in vocabulary
- [ ] No errors or blank text passages
- [ ] All typing test features remain functional

## Test 3: Mixed Scenarios
**Objective**: Test API recovery and edge cases

### Steps:
1. [ ] Start with offline mode enabled, generate text (should use fallback)
2. [ ] Re-enable network connection
3. [ ] Generate new text (should attempt API again)
4. [ ] Test rapid successive text generations
5. [ ] Test with different timer durations (30s, 60s, 120s)

### Expected Results:
- [ ] System seamlessly switches between API and fallback
- [ ] No performance degradation during rapid generations
- [ ] Text length adjusts appropriately for different durations
- [ ] Cache statistics show reasonable cache usage

## Test 4: Core Game Features Verification
**Objective**: Ensure all original typing test features remain intact

### Typing Mechanics:
- [ ] Real-time character highlighting (green/red/cursor)
- [ ] Accurate keystroke detection and typo counting
- [ ] Backspace functionality works correctly
- [ ] Non-printable keys are ignored properly

### Metrics Calculation:
- [ ] Gross WPM calculation: `(total_chars / 5) / minutes`
- [ ] Net WPM calculation: `(correct_chars / 5) / minutes`
- [ ] Accuracy percentage: `(correct / total) * 100`
- [ ] Raw typos count every incorrect keystroke
- [ ] Final typos count remaining errors

### Timer & Controls:
- [ ] 30s, 60s, 120s timer options work
- [ ] "Start immediately" mode functions
- [ ] "Start on first keystroke" mode functions
- [ ] Timer countdown is accurate
- [ ] Test completes when timer reaches zero
- [ ] Test completes when all text is typed

### Results Display:
- [ ] Comprehensive statistics shown after test
- [ ] Performance breakdown with WPM ratings
- [ ] Error analysis (raw vs final typos)
- [ ] "Take Another Test" button works

## Test 5: API Configuration Testing
**Objective**: Verify API configuration and monitoring

### Console Commands (run in browser console):
```javascript
// Check cache statistics
console.log('Cache Stats:', TextGenerator.getCacheStats());

// Clear cache and test
TextGenerator.clearCache();

// Test with API disabled
const generator = new TextGenerator(12345, false);
generator.generatePassageAsync({useApi: false}).then(console.log);
```

### Expected Results:
- [ ] Cache statistics show reasonable data
- [ ] Cache clearing works properly
- [ ] API can be disabled for testing
- [ ] Fallback generation works independently

## Test 6: Error Handling & Edge Cases
**Objective**: Verify robust error handling

### Steps:
1. [ ] Test with very slow network (throttle to 2G)
2. [ ] Test with intermittent network failures
3. [ ] Generate very short passages (minSentences: 1)
4. [ ] Generate very long passages (targetLength: 1000)
5. [ ] Test with different seeds for reproducibility

### Expected Results:
- [ ] Graceful handling of slow API responses
- [ ] Automatic fallback on timeout (3 seconds)
- [ ] Short and long passages generate correctly
- [ ] Same seed produces consistent results
- [ ] No application crashes or infinite loops

## Success Criteria
✅ **All tests pass** = API integration successful with reliable fallback
⚠️ **Some tests fail** = Review error handling and fallback logic
❌ **Many tests fail** = Major integration issues need resolution

## Debugging Tips
- Monitor Network tab for API request patterns
- Check Console for detailed error messages and fallback triggers
- Use `TextGenerator.getCacheStats()` to monitor cache behavior
- Test with `useApi: false` option to isolate fallback functionality
- Verify sentence templates are being filled correctly

---
**Test Date**: ___________  
**Tester**: ___________  
**Results**: ___________
