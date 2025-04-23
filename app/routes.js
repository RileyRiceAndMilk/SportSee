import express from 'express';
import idx from 'idx';

import { 
    getUserById, 
    getUserActivityById, 
    getUserAverageSession, 
    getUserPerformance 
} from './models';

import { handleNoUserData } from './middleware';

const router = express.Router();

router.get('/user/:id', (req, res) => {
    const userId = idx(req, _ => _.params.id);
    const userData = getUserById(Number(userId));

    return handleNoUserData(res, userData);
});

router.get('/user/:id/activity', (req, res) => {
    const userId = idx(req, _ => _.params.id);
    const userData = getUserActivityById(Number(userId));

    return handleNoUserData(res, userData);
});

router.get('/user/:id/average-sessions', (req, res) => {
    const userId = idx(req, _ => _.params.id);
    const userData = getUserAverageSession(Number(userId));

    return handleNoUserData(res, userData);
});

router.get('/user/:id/performance', (req, res) => {
    const userId = idx(req, _ => _.params.id);
    const userData = getUserPerformance(Number(userId));

    return handleNoUserData(res, userData);
});

export default router;


