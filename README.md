# Flash Card Knowledge Game

An interactive flash card quiz game inspired by NotebookLM's flash card system, featuring a JSON-based API backend for data retrieval and quiz-style score tracking with self-evaluation mode.

## Features

✨ **Self-Evaluation Mode** - Disclaimer screen explains the quiz before starting  
✨ **Interactive Flash Cards** - Click to flip and reveal answers  
🎮 **Auto-Advancing Cards** - Automatically moves to next card after marking answer with smooth animation  
📊 **Score Tracking** - Real-time tracking of correct answers, total cards, and accuracy percentage  
🌐 **API Backend** - Node.js/Express server serving flashcards as JSON  
🎨 **Light/Dark Mode** - Toggle between themes with localStorage persistence  
📱 **Responsive Design** - Works on desktop, tablet, and mobile devices  
✨ **Smooth Animations** - Flat design with card entry/exit animations and transitions  

## Project Structure

```
flash-card-knowledge/
├── index.html              # Main HTML file with UI structure & disclaimer modal
├── package.json            # Node.js dependencies
├── server.js               # Express backend API server
├── css/
│   └── style.css          # Flat design styling with animations & theme support
└── js/
    ├── create.js          # Frontend game logic and API integration
    └── theme.js           # Theme management with localStorage
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `nodemon` (dev) - Auto-restart server during development

### 2. Start the Backend Server

```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
Flash Card API Server running on http://localhost:3000
Serve flashcards from: http://localhost:3000/api/flashcards
Open the app: http://localhost:3000
```

### 3. Access the Game

Open your browser and navigate to:
```
http://localhost:3000
```

## How to Play

1. **Read the Disclaimer** - Understand that this is a self-evaluation quiz
2. **Click "Start Quiz"** - Begin the quiz
3. **Read the Question** - The front of the card displays the question
4. **Click to Flip** - Click the card to reveal the answer
5. **Evaluate Your Knowledge** - Click either:
   - **✓ Correct** - If you got it right
   - **✗ Incorrect** - If you got it wrong
6. **Auto-Advance** - Card automatically transitions to the next question after 1.5 seconds
7. **Track Progress** - Watch your score update in the header in real-time
8. **View Results** - After all 10 cards, see your final score and accuracy percentage
9. **Reset or Quit** - Click "Reset Game" to start over

## Game Flow

```
Disclaimer Modal
      ↓
  [Start Quiz]
      ↓
Load & Display Card 1
      ↓
User Flips Card
      ↓
Mark Correct/Incorrect
      ↓
Card Exits with Animation → Card Enters with Animation
      ↓
Repeat for Cards 2-10
      ↓
Results Screen
```

## Theme System

### Light Mode (Default)
- White background with dark text
- Professional blue and grey colors
- Subtle shadows for depth

### Dark Mode
- Dark background (#1a1a1a)
- Light grey text
- Blue accents maintained
- Easy on the eyes for night studying

### Toggle Theme
- Click the button in header (🌙 or ☀️)
- Theme preference is saved to localStorage
- Persists across browser sessions

## API Endpoints

### Get All Flashcards
```
GET /api/flashcards
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "What does HTML stand for?",
      "answer": "HyperText Markup Language..."
    },
    ...
  ],
  "total": 11
}
```

### Get Single Flashcard
```
GET /api/flashcards/:id
```

## Current Flashcards (11 total)

1. Zimbabwean Kalanga Chief - Cultural knowledge
2. HTML Basics - Web development
3. CSS Styling - Web development
4. JavaScript Role - Web development
5. DOM Manipulation - Web development
6. Semantic HTML - Web development
7. Callback Functions - Web development
8. Variable Declarations - Web development
9. APIs - Web development
10. Async vs Sync - Web development
11. Responsive Design - Web development

## Adding New Flashcards

Edit [server.js](server.js) and add to the `flashcards` array:

```javascript
{
    id: 12,
    question: "Your question here?",
    answer: "Your answer here in detail."
}
```

## Development

To use auto-reload during development:
```bash
npm run dev
```

This requires `nodemon` (included in devDependencies).

## Customization

### Change Quiz Disclaimer
Edit the modal content in [index.html](index.html) under `<!-- Self-Evaluation Modal -->`

### Modify Styling
Edit [css/style.css](css/style.css) to customize:
- Colors (via CSS custom properties)
- Card sizes
- Font styles
- Animation speeds

### Update API Port
In [server.js](server.js), change:
```javascript
const PORT = 3000;
```

Then update the API URL in [js/create.js](js/create.js):
```javascript
apiUrl: 'http://localhost:YOUR_PORT/api/flashcards'
```

### Change Auto-Advance Delay
In [js/create.js](js/create.js), modify the timeout (currently 1500ms = 1.5 seconds):
```javascript
setTimeout(nextCard, 1500);  // Change 1500 to your preferred milliseconds
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technical Details

### Frontend Technology
- Vanilla JavaScript (no frameworks)
- CSS3 animations and transforms
- CSS custom properties for theming
- localStorage API for persistence

### Backend Technology
- Node.js with Express
- CORS enabled for cross-origin requests
- Static file serving for frontend
- JSON API

### Animation Details
- Card flip: 0.6s CSS 3D transform
- Card entry: 0.4s slide-in from right
- Card exit: 0.4s slide-out to left
- Modal fade: 0.3s opacity transition
- Results slide: 0.5s bounce effect

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Added disclaimer modal, reorganized layout |
| `css/style.css` | Converted to flat design with CSS variables, added modal & animation styles |
| `js/create.js` | Auto-advance logic, modal handling, card animations |
| `js/theme.js` | (New) Light/Dark mode with localStorage |
| `server.js` | 11 flashcards including Zimbabwean Kalanga Chief |

## Files Deleted

| File | Reason |
|------|--------|
| `js/data.js` | Unused - API serves all data |

## Future Enhancements

- Category-based flashcards
- Shuffle mode
- Difficulty levels
- User authentication & progress tracking
- Keyboard shortcuts (arrow keys to navigate)
- Export results as PDF
- Spaced repetition algorithm
- Flashcard editor UI
- Multiple language support
- Leaderboard

## License

MIT License - Feel free to use and modify!
