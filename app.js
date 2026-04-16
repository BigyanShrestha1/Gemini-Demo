import express from 'express';
import { gemini_api_call } from './gemini_api_call.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/gemini', async (req, res) => {
    try {
        const { userQuery } = req.body;

        if (!userQuery || !userQuery.trim()) {
            return res.status(400).json({ answer: 'No query provided' });
        }

        const response = await gemini_api_call(userQuery.trim());

        res.json({ answer: response });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ answer: 'Error processing your request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
