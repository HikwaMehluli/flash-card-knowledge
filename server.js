require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const API_DIR = path.join(__dirname, 'api');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Helper to get available categories
const getCategories = () => {
    try {
        const files = fs.readdirSync(API_DIR);
        return files
            .filter(file => file.endsWith('_facts.json'))
            .map(file => {
                const filePath = path.join(API_DIR, file);
                const rawData = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(rawData);
                return {
                    id: file.replace('_facts.json', ''),
                    name: data.topic || file.replace('_facts.json', '').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                };
            });
    } catch (error) {
        console.error('Error reading API directory:', error);
        return [];
    }
};

// API endpoint to get all categories
app.get('/api/categories', (req, res) => {
    const categories = getCategories();
    res.json({
        success: true,
        data: categories
    });
});

// API endpoint to get flashcards for a specific category
app.get('/api/flashcards', (req, res) => {
    const category = req.query.category || 'zimbabwe';
    const filePath = path.join(API_DIR, `${category}_facts.json`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: `Category '${category}' not found`
            });
        }

        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        res.json({
            success: true,
            data: data.flashcards,
            metadata: {
                name: data.flashCardName,
                description: data.description,
                dateCreated: data.dateCreated,
                dateUpdated: data.dateUpdated
            },
            total: data.flashcards.length,
            category: category
        });
    } catch (error) {
        console.error(`Error reading flashcards for ${category}:`, error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// API endpoint to get a single flashcard from a specific category
app.get('/api/flashcards/:id', (req, res) => {
    const category = req.query.category || 'zimbabwe';
    const filePath = path.join(API_DIR, `${category}_facts.json`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: `Category '${category}' not found`
            });
        }

        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);
        const card = data.flashcards.find(c => c.id === parseInt(req.params.id));

        if (card) {
            res.json({
                success: true,
                data: card
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Flashcard not found'
            });
        }
    } catch (error) {
        console.error(`Error reading flashcard ${req.params.id} for ${category}:`, error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Flash Card API Server running on http://localhost:${PORT}`);
    console.log(`Serve flashcards from: http://localhost:${PORT}/api/flashcards`);
    console.log(`Open the app: http://localhost:${PORT}`);
});
