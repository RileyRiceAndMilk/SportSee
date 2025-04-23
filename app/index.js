import express from 'express';
import cors from 'cors';

import { getUserById, getUserActivityById, getUserAverageSession, getUserPerformance } from './models.js';
import { handleNoUserData } from './middleware.js';


const app = express();
app.use(cors());

const port = 3000;

// Définir directement les routes ici sans avoir besoin de router.js
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const userData = getUserById(Number(userId));
    return handleNoUserData(res, userData);
});

app.get('/user/:id/activity', (req, res) => {
    const userId = req.params.id;
    const userData = getUserActivityById(Number(userId));
    return handleNoUserData(res, userData);
});

app.get('/user/:id/average-sessions', (req, res) => {
    const userId = req.params.id;
    const userData = getUserAverageSession(Number(userId));
    return handleNoUserData(res, userData);
});

app.get('/user/:id/performance', (req, res) => {
    const userId = req.params.id;
    const userData = getUserPerformance(Number(userId));
    return handleNoUserData(res, userData);
});

// Démarrer l'application sur le port 3000
app.listen(port, () => console.log(`Magic happens on port ${port}`));
