/**
 * Main App Component
 * Entry point for the Typing Speed Test application
 */

import React from 'react';
import TypingTest from './components/TypingTest';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <TypingTest />
        </div>
    );
};

export default App;
