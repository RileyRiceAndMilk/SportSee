const API_URL = 'http://localhost:3000'; // URL de l'API
const LOCAL_DATA_URL = '/data.json'; // URL du fichier de données locales

import config from '../../config';

export const fetchUserData = async (id) => {
  try {
    console.log("Fetching user data for ID:", id); // Log pour vérifier l'ID

    if (config.useApi) {
      console.log("Using API..."); // Log pour indiquer qu'on utilise l'API

      // Envoie plusieurs requêtes en parallèle pour récupérer les données
      const [userRes, activityRes, performanceRes, sessionsRes] = await Promise.all([
        fetch(`${API_URL}/user/${id}`),
        fetch(`${API_URL}/user/${id}/activity`),
        fetch(`${API_URL}/user/${id}/performance`),
        fetch(`${API_URL}/user/${id}/average-sessions`),
      ]);

      if (!userRes.ok || !activityRes.ok || !performanceRes.ok || !sessionsRes.ok) {
        throw new Error("Erreur lors de la récupération des données de l'API");
      }

      const userData = await userRes.json();
      const userActivity = await activityRes.json();
      const userPerformance = await performanceRes.json();
      const userSessions = await sessionsRes.json();

      return {
        userData: userData.data, // Assurez-vous que 'data' est la clé correcte
        userActivity: userActivity.data,
        userPerformance: userPerformance.data,
        userSessions: userSessions.data,
      };
    } else {
      console.log("Using local data..."); // Log pour indiquer qu'on utilise les données locales

      // Charge le fichier JSON local
      const res = await fetch(LOCAL_DATA_URL);
      if (!res.ok) {
        throw new Error("Erreur lors du chargement des données locales");
      }

      const data = await res.json();
      const userId = parseInt(id); // Assurez-vous que l'ID est un nombre entier

      return {
        userData: data.USER_MAIN_DATA.find((u) => u.id === userId),
        userActivity: data.USER_ACTIVITY.find((u) => u.userId === userId),
        userPerformance: data.USER_PERFORMANCE.find((u) => u.userId === userId),
        userSessions: data.USER_AVERAGE_SESSIONS.find((u) => u.userId === userId),
      };
    }
  } catch (error) {
    console.error('Erreur dans fetchUserData:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const url = config.useApi ? `${API_URL}/user` : LOCAL_DATA_URL; // Choisit l'URL en fonction de la config
    console.log("Fetching users from URL:", url); // Log pour vérifier l'URL

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }

    const data = await response.json();
    
    // Si on utilise l'API, on retourne `data.data`, sinon on retourne `data.USER_MAIN_DATA` pour les données locales
    return config.useApi ? data.data : data.USER_MAIN_DATA;
  } catch (error) {
    console.error('Erreur dans fetchUsers:', error);
    throw error;
  }
};




