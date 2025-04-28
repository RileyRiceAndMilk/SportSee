import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'  
}));

app.use(express.json());

const usersData = {
  12: {
    id: 12,
    userInfos: {
      firstName: 'Karl',
      lastName: 'Dovineau',
      age: 31
    },
    todayScore: 0.12,
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50
    }
  },
  18: {
    id: 18,
    userInfos: {
      firstName: 'Cecilia',
      lastName: 'Ratorez',
      age: 34
    },
    todayScore: 0.3,
    keyData: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120
    }
  }
};

app.get('/user', (req, res) => {
  const allUsers = Object.values(usersData);  
  res.json({ data: allUsers });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  const userData = usersData[id]; 

  if (!userData) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.json({ data: userData });
});

app.get('/user/:id/activity', (req, res) => {
  const { id } = req.params;

  const activities = {
    12: [
      { day: '2020-07-01', kilogram: 80, calories: 240 },
      { day: '2020-07-02', kilogram: 80, calories: 220 },
      { day: '2020-07-03', kilogram: 81, calories: 280 },
      { day: '2020-07-04', kilogram: 81, calories: 290 },
      { day: '2020-07-05', kilogram: 80, calories: 160 },
      { day: '2020-07-06', kilogram: 78, calories: 162 },
      { day: '2020-07-07', kilogram: 76, calories: 390 }
    ],
    18: [
      { day: '2020-07-01', kilogram: 70, calories: 240 },
      { day: '2020-07-02', kilogram: 69, calories: 220 },
      { day: '2020-07-03', kilogram: 70, calories: 280 },
      { day: '2020-07-04', kilogram: 70, calories: 500 },
      { day: '2020-07-05', kilogram: 69, calories: 160 },
      { day: '2020-07-06', kilogram: 69, calories: 162 },
      { day: '2020-07-07', kilogram: 69, calories: 390 }
    ]
  };

  const activityData = activities[id];

  if (!activityData) {
    return res.status(404).json({ error: 'Activité non trouvée pour cet utilisateur' });
  }

  res.json({ data: { userId: id, sessions: activityData } });
});

app.get('/user/:id/performance', (req, res) => {
  const { id } = req.params;

  const performances = {
    12: [
      { kind: 1, value: 80 },
      { kind: 2, value: 120 },
      { kind: 3, value: 140 },
      { kind: 4, value: 50 },
      { kind: 5, value: 200 },
      { kind: 6, value: 90 }
    ],
    18: [
      { kind: 1, value: 200 },
      { kind: 2, value: 240 },
      { kind: 3, value: 80 },
      { kind: 4, value: 80 },
      { kind: 5, value: 220 },
      { kind: 6, value: 110 }
    ]
  };

  const performanceData = performances[id];

  if (!performanceData) {
    return res.status(404).json({ error: 'Données de performance non trouvées pour cet utilisateur' });
  }

  res.json({ data: { userId: id, data: performanceData } });
});

app.get('/user/:id/average-sessions', (req, res) => {
  const { id } = req.params;

  const averageSessions = {
    12: [
      { day: 1, sessionLength: 30 },
      { day: 2, sessionLength: 23 },
      { day: 3, sessionLength: 45 },
      { day: 4, sessionLength: 50 },
      { day: 5, sessionLength: 0 },
      { day: 6, sessionLength: 0 },
      { day: 7, sessionLength: 60 }
    ],
    18: [
      { day: 1, sessionLength: 30 },
      { day: 2, sessionLength: 40 },
      { day: 3, sessionLength: 50 },
      { day: 4, sessionLength: 30 },
      { day: 5, sessionLength: 30 },
      { day: 6, sessionLength: 50 },
      { day: 7, sessionLength: 50 }
    ]
  };

  const averageSessionData = averageSessions[id];

  if (!averageSessionData) {
    return res.status(404).json({ error: 'Données de sessions moyennes non trouvées pour cet utilisateur' });
  }

  res.json({ data: { userId: id, sessions: averageSessionData } });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




