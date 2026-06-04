// Theme Management with localStorage

const THEME_KEY = 'flashcard-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Get the saved theme from localStorage or default to light
function getSavedTheme() {
	const savedTheme = localStorage.getItem(THEME_KEY);
	return savedTheme || LIGHT_THEME;
}

// Set theme in localStorage and apply it
function setTheme(theme) {
	localStorage.setItem(THEME_KEY, theme);
	applyTheme(theme);
}

// Apply theme to the document
function applyTheme(theme) {
	const htmlElement = document.documentElement;
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = document.getElementById('theme-icon');
	const themeText = document.getElementById('theme-text');

	if (theme === DARK_THEME) {
		htmlElement.setAttribute('data-theme', DARK_THEME);
		themeIcon.textContent = '☀️';
		themeText.textContent = 'Light';
	} else {
		htmlElement.removeAttribute('data-theme');
		themeIcon.textContent = '🌙';
		themeText.textContent = 'Dark';
	}
}

// Toggle theme
function toggleTheme() {
	const currentTheme = getSavedTheme();
	const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
	setTheme(newTheme);
}

// Initialize theme on page load
function initializeTheme() {
	const savedTheme = getSavedTheme();
	applyTheme(savedTheme);

	// Add event listener to theme toggle button
	const themeToggle = document.getElementById('theme-toggle');
	if (themeToggle) {
		themeToggle.addEventListener('click', toggleTheme);
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
	initializeTheme();
}
