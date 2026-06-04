let gameState = {
	flashcards: [],
	categories: [],
	selectedCategory: 'zimbabwe',
	currentIndex: 0,
	correctCount: 0,
	totalCards: 0,
	answered: false,
	gameStarted: false,
	baseApiUrl: '/api'
};

// DOM elements
const disclaimerModal = document.getElementById("disclaimer-modal");
const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category-select");
const progressBar = document.getElementById("progress-bar");
const headerTitle = document.getElementById("header-title");
const headerDescription = document.getElementById("header-description");
const gameArea = document.getElementById("game-area");
const container = document.getElementById("flashcard-container");
const correctBtn = document.getElementById("correct-btn");
const incorrectBtn = document.getElementById("incorrect-btn");
const resetBtnResults = document.getElementById("reset-btn-results");
const currentCardDisplay = document.getElementById("current-card");
const processingStatus = document.getElementById("processing-status");
const gameResultsDiv = document.getElementById("game-results");

// Fetch categories from API
async function loadCategories() {
	try {
		const response = await fetch(`${gameState.baseApiUrl}/categories`);
		if (!response.ok) throw new Error('Failed to fetch categories');
		
		const data = await response.json();
		gameState.categories = data.data;
		
		populateCategorySelect();
	} catch (error) {
		console.error('Error loading categories:', error);
	}
}

// Populate category dropdown
function populateCategorySelect() {
	categorySelect.innerHTML = gameState.categories.map(cat => 
		`<option value="${cat.id}" ${cat.id === gameState.selectedCategory ? 'selected' : ''}>${cat.name}</option>`
	).join('');
}

// Fetch flashcards from API based on selected category
async function loadFlashcards() {
	try {
		const response = await fetch(`${gameState.baseApiUrl}/flashcards?category=${gameState.selectedCategory}`);
		if (!response.ok) throw new Error('Failed to fetch flashcards');
		
		const data = await response.json();
		
		// Randomize the flashcards
		let allCards = data.data;
		gameState.flashcards = shuffleArray(allCards).slice(0, 10);
		gameState.totalCards = gameState.flashcards.length;
		
		// Update header with metadata from API
		if (data.metadata) {
			headerTitle.textContent = data.metadata.name;
			headerDescription.textContent = data.metadata.description;
		}
		
		displayCard();
	} catch (error) {
		console.error('Error loading flashcards:', error);
		container.innerHTML = `<p class="error">Error loading flashcards. Make sure the backend server is running.</p>`;
	}
}

// Utility to shuffle array (Fisher-Yates)
function shuffleArray(array) {
	let shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// Start game from disclaimer
function startGame() {
	gameState.selectedCategory = categorySelect.value;
	disclaimerModal.style.display = 'none';
	gameArea.style.display = 'block';
	gameState.gameStarted = true;
	
	loadFlashcards();
}

// Display current card with animation
function displayCard() {
	if (gameState.currentIndex >= gameState.flashcards.length) {
		showGameResults();
		return;
	}
	
	updateProgressBar();
	
	const card = gameState.flashcards[gameState.currentIndex];
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card", "entry-animation");

	cardDiv.innerHTML = `
		<div class="card-inner">
			<div class="card-front">
				${card.question}
			</div>
			<div class="card-back">${card.answer}</div>
		</div>
	`;

	cardDiv.addEventListener("click", () => {
		cardDiv.classList.toggle("flipped");
		// Enable buttons when card is flipped
		if (cardDiv.classList.contains("flipped") && !gameState.answered) {
			correctBtn.disabled = false;
			incorrectBtn.disabled = false;
		} else {
			correctBtn.disabled = true;
			incorrectBtn.disabled = true;
		}
	});

	container.innerHTML = '';
	container.appendChild(cardDiv);
	
	// Update card info and reset button states
	updateCardInfo();
	// Disable buttons until card is flipped
	correctBtn.disabled = true;
	incorrectBtn.disabled = true;
	gameState.answered = false;
}

// Update progress bar
function updateProgressBar() {
	const progress = (gameState.currentIndex / gameState.totalCards) * 100;
	progressBar.style.width = `${progress}%`;
}

// Update card display info
function updateCardInfo() {
	currentCardDisplay.textContent = `Card ${gameState.currentIndex + 1} of ${gameState.totalCards}`;
}

// Show processing status
function showProcessing() {
	processingStatus.style.display = 'block';
}

// Hide processing status
function hideProcessing() {
	processingStatus.style.display = 'none';
}

// Mark answer as correct
function markCorrect() {
	if (gameState.answered) return;
	
	gameState.correctCount++;
	gameState.answered = true;
	correctBtn.disabled = true;
	incorrectBtn.disabled = true;
	
	applyProcessingAnimation();
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
	
	applyProcessingAnimation();
	showProcessing();
	
	// Auto-advance after delay
	setTimeout(nextCard, 1500);
}

// Apply processing animation with revolving border
function applyProcessingAnimation() {
	const card = container.querySelector('.card');
	if (card) card.classList.add('processing');
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
	// Update progress bar to 100%
	progressBar.style.width = '100%';
	
	// Hide game area components
	container.style.display = 'none';
	document.querySelector('.card-info').style.display = 'none';
	document.querySelector('.action-buttons').style.display = 'none';
	document.querySelector('.progress-container').style.display = 'none';
	
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
	container.style.display = 'flex';
	container.innerHTML = '';
	document.querySelector('.card-info').style.display = 'block';
	document.querySelector('.action-buttons').style.display = 'flex';
	document.querySelector('.progress-container').style.display = 'block';
	progressBar.style.width = '0%';
	
	hideProcessing();
	gameArea.style.display = 'none';
	
	disclaimerModal.style.display = 'flex';
}

// Event listeners
startBtn.addEventListener('click', startGame);
correctBtn.addEventListener('click', markCorrect);
incorrectBtn.addEventListener('click', markIncorrect);
resetBtnResults.addEventListener('click', resetGame);

// Initialize the game
loadCategories();