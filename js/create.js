// Game state
let gameState = {
	flashcards: [],
	currentIndex: 0,
	correctCount: 0,
	totalCards: 0,
	answered: false,
	gameStarted: false,
	apiUrl: 'http://localhost:3000/api/flashcards'
};

// DOM elements
const disclaimerModal = document.getElementById("disclaimer-modal");
const startBtn = document.getElementById("start-btn");
const gameArea = document.getElementById("game-area");
const container = document.getElementById("flashcard-container");
const correctBtn = document.getElementById("correct-btn");
const incorrectBtn = document.getElementById("incorrect-btn");
const resetBtn = document.getElementById("reset-btn");
const resetBtnResults = document.getElementById("reset-btn-results");
const currentCardDisplay = document.getElementById("current-card");
const progressBar = document.getElementById("progress-bar");
const processingStatus = document.getElementById("processing-status");
const gameResultsDiv = document.getElementById("game-results");

// Fetch flashcards from API
async function loadFlashcards() {
	try {
		const response = await fetch(gameState.apiUrl);
		if (!response.ok) throw new Error('Failed to fetch flashcards');
		
		const data = await response.json();
		gameState.flashcards = data.data;
		gameState.totalCards = data.total;
	} catch (error) {
		console.error('Error loading flashcards:', error);
		container.innerHTML = `<p class="error">Error loading flashcards. Make sure the backend server is running on port 3000.</p>`;
	}
}

// Start game from disclaimer
function startGame() {
	disclaimerModal.style.display = 'none';
	gameArea.style.display = 'block';
	gameState.gameStarted = true;
	displayCard();
}

// Display current card with animation
function displayCard() {
	if (gameState.currentIndex >= gameState.flashcards.length) {
		showGameResults();
		return;
	}
	
	const card = gameState.flashcards[gameState.currentIndex];
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card", "entry-animation");

	cardDiv.innerHTML = `
		<div class="card-inner">
			<div class="card-front">${card.question}</div>
			<div class="card-back">${card.answer}</div>
		</div>
	`;

	cardDiv.addEventListener("click", () => {
		cardDiv.classList.toggle("flipped");
	});

	container.innerHTML = '';
	container.appendChild(cardDiv);
	
	// Update card info and reset button states
	updateCardInfo();
	resetButtonStates();
	gameState.answered = false;
}

// Update card display info with progress bar
function updateCardInfo() {
	currentCardDisplay.textContent = `Card ${gameState.currentIndex + 1} of ${gameState.totalCards}`;
	
	// Update progress bar
	const progressPercent = ((gameState.currentIndex) / gameState.totalCards) * 100;
	progressBar.style.width = progressPercent + '%';
}

// Show processing status
function showProcessing() {
	processingStatus.style.display = 'block';
}

// Hide processing status
function hideProcessing() {
	processingStatus.style.display = 'none';
}

// Reset button states
function resetButtonStates() {
	correctBtn.disabled = false;
	incorrectBtn.disabled = false;
}

// Mark answer as correct
function markCorrect() {
	if (gameState.answered) return;
	
	gameState.correctCount++;
	gameState.answered = true;
	correctBtn.disabled = true;
	incorrectBtn.disabled = true;
	
	highlightCardCorrect();
	showProcessing();
	
	// Auto-advance after delay
	setTimeout(nextCard, 1500);
}

// Mark answer as incorrect
function markIncorrect() {
	if (gameState.answered) return;
	
	gameState.answered = true;
	correctBtn.disabled = true;
	incorrectBtn.disabled = true;
	
	highlightCardIncorrect();
	showProcessing();
	
	// Auto-advance after delay
	setTimeout(nextCard, 1500);
}

// Highlight card as correct
function highlightCardCorrect() {
	const card = container.querySelector('.card');
	if (card) card.classList.add('correct-answer');
}

// Highlight card as incorrect
function highlightCardIncorrect() {
	const card = container.querySelector('.card');
	if (card) card.classList.add('incorrect-answer');
}

// Move to next card with animation
function nextCard() {
	const card = container.querySelector('.card');
	if (card) {
		card.classList.add('exit-animation');
		
		setTimeout(() => {
			hideProcessing();
			gameState.currentIndex++;
			displayCard();
		}, 400);
	} else {
		hideProcessing();
		gameState.currentIndex++;
		displayCard();
	}
}

// Show game results
function showGameResults() {
	// Hide game area
	gameArea.style.display = 'none';

	// Show game area again for results
	gameArea.style.display = 'block';
	container.style.display = 'none';
	document.querySelector('.card-info').style.display = 'none';
	document.querySelector('.action-buttons').style.display = 'none';
	resetBtnResults.style.display = 'block';
	
	const accuracy = Math.round((gameState.correctCount / gameState.totalCards) * 100);
	
	document.getElementById('final-correct').textContent = gameState.correctCount;
	document.getElementById('final-total').textContent = gameState.totalCards;
	document.getElementById('final-accuracy').textContent = accuracy + '%';
	
	gameResultsDiv.style.display = 'block';
}

// Reset game
function resetGame() {
	gameState.currentIndex = 0;
	gameState.correctCount = 0;
	gameState.answered = false;
	gameState.gameStarted = false;
	
	gameResultsDiv.style.display = 'none';
	resetBtnResults.style.display = 'none';
	container.style.display = 'flex';
	container.innerHTML = '';
	document.querySelector('.card-info').style.display = 'block';
	document.querySelector('.action-buttons').style.display = 'flex';
	hideProcessing();
	progressBar.style.width = '0%';
	gameArea.style.display = 'none';
	
	disclaimerModal.style.display = 'flex';
}

// Event listeners
startBtn.addEventListener('click', startGame);
correctBtn.addEventListener('click', markCorrect);
incorrectBtn.addEventListener('click', markIncorrect);
resetBtn.addEventListener('click', resetGame);
resetBtnResults.addEventListener('click', resetGame);

// Initialize the game
loadFlashcards();