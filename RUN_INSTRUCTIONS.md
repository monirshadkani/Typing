# Dark Theme Typing Speed Test - Run Instructions

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation & Setup

1. **Navigate to project directory**:
   ```bash
   cd IAGenerative
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   - Automatically opens at `http://localhost:3000`
   - Or manually navigate to the URL

### Expected Behavior
- **Immediate dark theme**: Black background (#121212) loads instantly
- **Professional typography**: Fira Code/Roboto Mono fonts
- **Responsive layout**: Centered design with proper spacing
- **Interactive elements**: Glowing buttons and smooth animations

## Development Commands

### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Building
```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
```

### Code Quality
```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Browser Compatibility

### Supported Browsers
- **Chrome 90+** ✅ (Recommended)
- **Firefox 88+** ✅
- **Safari 14+** ✅
- **Edge 90+** ✅

### Required Features
- CSS Grid and Flexbox support
- CSS Custom Properties (variables)
- ES6+ JavaScript features
- Local Storage API
- Fetch API for words-api integration

## Performance Optimization

### Production Settings
- Enable production build for optimal performance
- Gzip compression recommended
- CDN hosting for static assets
- Service worker for offline functionality

### Development Tips
- Use React Developer Tools for debugging
- Monitor Network tab for API calls
- Check Console for any warnings
- Use Lighthouse for performance auditing

## Troubleshooting

### Common Issues

#### Dark theme not loading
- **Cause**: CSS not properly imported
- **Solution**: Verify Tailwind CSS is configured correctly
- **Check**: `src/index.css` imports Tailwind

#### Fonts not displaying correctly
- **Cause**: Font loading issues or fallbacks
- **Solution**: Ensure Google Fonts are loading
- **Fallback**: System monospace fonts will be used

#### API integration not working
- **Cause**: Network issues or CORS problems
- **Solution**: App automatically falls back to built-in word bank
- **Check**: Browser console for API error messages

#### Timer accuracy issues
- **Cause**: Browser tab inactive or system performance
- **Solution**: Timer uses timestamp-based calculation
- **Note**: Should remain accurate regardless of tab state

### Debug Mode
Enable debug mode by adding to browser console:
```javascript
localStorage.setItem('debug', 'true');
location.reload();
```

### Performance Monitoring
Check performance in browser console:
```javascript
// Monitor typing performance
setInterval(() => {
  console.log('FPS:', Math.round(1000 / (performance.now() - window.lastFrame)));
  window.lastFrame = performance.now();
}, 1000);
```

## Configuration Options

### Environment Variables
Create `.env` file in project root:
```env
# API Configuration
REACT_APP_WORDS_API_URL=https://api.github.com/repos/dulldesk/words-api
REACT_APP_API_TIMEOUT=3000
REACT_APP_API_RETRIES=2

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_DEBUG_MODE=false
```

### Customization
- **Colors**: Edit `src/App.css` for theme customization
- **Fonts**: Modify font imports and CSS variables
- **Layout**: Adjust component spacing and sizing
- **Animations**: Configure duration and easing in CSS

## Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Deploy 'build' folder to:
# - Netlify, Vercel, GitHub Pages
# - AWS S3 + CloudFront
# - Firebase Hosting
```

### Server Requirements
- **Static files only** - No server-side rendering needed
- **HTTPS recommended** - For security and API access
- **Gzip compression** - For optimal loading speed
- **Cache headers** - For static asset optimization

---

## Ready to Test!

The application should now be running with:
- ✅ **Dark theme** with professional styling
- ✅ **Advanced typo visualization** with overlays
- ✅ **Accurate timer system** with sub-second precision
- ✅ **Real-time statistics** with live updates
- ✅ **API integration** with graceful fallbacks
- ✅ **Responsive design** for all screen sizes

Open `http://localhost:3000` and start typing to test all features!
