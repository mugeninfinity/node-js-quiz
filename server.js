// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Define the path to your public directory and audio subdirectory
const publicDirectory = path.join(__dirname, 'public');
const audioDirectory = path.join(publicDirectory, 'audio');

// API endpoint that the browser will call to get the list of sounds
app.get('/api/get-sounds', (req, res) => {
    if (!fs.existsSync(audioDirectory)) {
        console.error(`ERROR: The audio directory does not exist at: ${audioDirectory}`);
        return res.status(404).json({ 
            error: 'Audio directory not found on the server.',
            correct: [],
            incorrect: []
        });
    }

    fs.readdir(audioDirectory, (err, files) => {
        if (err) {
            console.error("Could not list the audio directory.", err);
            return res.status(500).json({ 
                error: 'Error reading sound files on the server.',
                correct: [],
                incorrect: []
            });
        }

        // ✅ FIX: Only include files that contain 'yes'/'no' AND end with .mp3
        const correctSounds = files
            .filter(file => /yes/i.test(file) && file.endsWith('.mp3'))
            .map(file => `audio/${file}`);
            
        const incorrectSounds = files
            .filter(file => /no/i.test(file) && file.endsWith('.mp3'))
            .map(file => `audio/${file}`);

        console.log(`Found ${correctSounds.length} correct sounds and ${incorrectSounds.length} incorrect sounds.`);
        
        res.json({
            correct: correctSounds,
            incorrect: incorrectSounds
        });
    });
});

app.get('/api/get-pages', (req, res) => {
    fs.readdir(publicDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read directory' });
        }
        // Filter for .html files and send the list back
        const htmlPages = files.filter(file => file.endsWith('.html'));
        res.json(htmlPages);
    });
});

// Serve the static files (HTML, CSS, client-side JS, etc.) from the 'public' directory
app.use(express.static(publicDirectory));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Serving files from: ${publicDirectory}`);
});