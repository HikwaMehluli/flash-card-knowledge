# Flash Card Knowledge Game

An interactive, multi-category flash card quiz game featuring a dynamic JSON-based API backend, real-time progress tracking, and a polished self-evaluation system.

## 🚀 Features

✨ **Dynamic Categories** - Choose from multiple topics like Zimbabwe, Namibia, South Africa, Zambia, or Web Development.  
✨ **Self-Evaluation Mode** - Disclaimer screen explains the quiz and allows topic selection before starting.  
✨ **Interactive Flash Cards** - Click to flip and reveal answers with smooth 3D animations.  
📊 **Progress Bar** - Visual indicator of your advancement through the 10-card session.  
📈 **Real-Time Accuracy** - Automatically calculates your score and accuracy percentage.  
🎮 **Snappy Feedback** - Cards auto-advance after 1.5 seconds once an answer is marked.  
🎨 **Theming** - Light/Dark mode toggle with persistence via `localStorage`.  
🌐 **Modern Backend** - Node.js/Express server that dynamically loads categories and metadata from JSON files.  
📱 **Responsive & Accessible** - Fully responsive design with a scrollable modal for smaller screens.

## 📁 Project Structure

```
flash-card-knowledge/
├── api/                   # JSON data files for different topics
├── css/
│   └── style.css          # Theme-aware styling and animations
├── js/
│   ├── create.js          # Main game logic and API integration
│   └── theme.js           # Theme toggle and persistence
├── server.js               # Express API server with dynamic loading
├── .env                    # Environment configuration
├── index.html              # Main application entry point
└── package.json            # Dependencies and scripts
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory (optional, defaults to port 3000):
```env
PORT=3000
```

### 3. Start the Server
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## 🎮 How to Play

1. **Select a Topic** - Use the dropdown in the initial modal to choose your quiz category.
2. **Read the Question** - The card shows a question from the chosen topic.
3. **Flip for Answer** - Click the card to see the correct answer.
4. **Self-Evaluate** - Mark your answer as **Correct** or **Incorrect** based on your honest assessment.
5. **Auto-Advance** - The game will move to the next card automatically after 1.5 seconds.
6. **View Results** - Get your final score and accuracy percentage at the end of the 10-card round.

## 🌐 API Endpoints

### Get Categories
`GET /api/categories` - Returns a list of available topics dynamically scanned from the `api/` folder.

### Get Flashcards
`GET /api/flashcards?category=[id]` - Fetches flashcards and metadata for a specific topic.

## 📝 Adding New Content

To add a new category, simply create a new file in the `api/` directory following this naming convention: `yourname_facts.json`.

**Data Format:**
```json
{
    "topic": "Display Name",
    "flashCardName": "Full Header Title",
    "dateCreated": "YYYY-MM-DD",
    "dateUpdated": "YYYY-MM-DD",
    "description": "Short description of the topic.",
    "flashcards": [
        { "id": 1, "question": "...", "answer": "..." }
    ]
}
```

## 💻 Tech Stack

- **Frontend:** Vanilla JavaScript, CSS3 (Flexbox/Grid), HTML5.
- **Backend:** Node.js, Express.
- **Storage:** `localStorage` (Theme preference).
- **Environment:** `dotenv`.

---
*Developed by Hikwa Mehluli*
