import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Résout __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lecture et parsing du fichier JSON
const rawData = fs.readFileSync(path.join(__dirname, 'public', 'data.json'));
const { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } = JSON.parse(rawData);

/**
 * @description Retrieve the main user info (first name, last name, today score)
 * @param {number} id 
 */
export const getUserById = id => USER_MAIN_DATA.find(user => user.id === id);

/**
 * @param {number} id 
 */
export const getUserActivityById = id => USER_ACTIVITY.find(activity => activity.userId === id);

/**
 * @param {number} id 
 */
export const getUserAverageSession = id => USER_AVERAGE_SESSIONS.find(session => session.userId === id);

/**
 * @param {number} id 
 */
export const getUserPerformance = id => USER_PERFORMANCE.find(perf => perf.userId === id);




