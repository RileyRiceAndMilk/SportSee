import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/style.css";
import Header from "../components/header";
import ActiviteQuotidienneChart from "../components/ActiviteQuotidienneChart";
import DureeSessionChart from "../components/DureeSessionChart";
import PerformanceRadarChart from "../components/PerformanceRadarChart";
import ScorePieChart from "../components/ScorePieChart"; 
import personIcon from '../assets/Person.png';
import natationIcon from '../assets/natation.png';
import veloIcon from '../assets/velo.png';
import haltereIcon from '../assets/haltere.png';
import fireIcon from '../assets/Fire.png';
import pouletIcon from '../assets/poulet.png';
import pommeIcon from '../assets/Pomme.png';
import hamburgerIcon from '../assets/Hamburger.png';
import config from "../../config";




function App() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const [sessionLengthData, setSessionLengthData] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [startAngle] = useState(90);
  const calorieCount = user?.keyData?.calorieCount || 0;
  const proteinCount = user?.keyData?.proteinCount || 0;
  const carbohydrateCount = user?.keyData?.carbohydrateCount || 0;
  const lipidCount = user?.keyData?.lipidCount || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData, userActivity, userPerformance, userSessions;
  
        if (config.useApi) {
          // 🔁 Appels vers l'API backend
          const [userRes, activityRes, performanceRes, sessionsRes] = await Promise.all([
            fetch(`http://localhost:3000/user/${id}`),
            fetch(`http://localhost:3000/user/${id}/activity`),
            fetch(`http://localhost:3000/user/${id}/performance`),
            fetch(`http://localhost:3000/user/${id}/average-sessions`),
          ]);
  
          if (!userRes.ok || !activityRes.ok || !performanceRes.ok || !sessionsRes.ok) {
            throw new Error("Erreur API");
          }
  
          userData = await userRes.json();
          userActivity = await activityRes.json();
          userPerformance = await performanceRes.json();
          userSessions = await sessionsRes.json();
  
          userData = userData.data;
          userActivity = userActivity.data;
          userPerformance = userPerformance.data;
          userSessions = userSessions.data;
  
        } else {
          // 📁 Lecture depuis data.json
          const res = await fetch("/data.json");
          if (!res.ok) {
            throw new Error("Erreur data.json");
          }
  
          const data = await res.json();
          userData = data.USER_MAIN_DATA.find((u) => u.id === parseInt(id));
          userActivity = data.USER_ACTIVITY.find((u) => u.userId === parseInt(id));
          userPerformance = data.USER_PERFORMANCE.find((u) => u.userId === parseInt(id));
          userSessions = data.USER_AVERAGE_SESSIONS.find((u) => u.userId === parseInt(id));
        }
  
        setUser({
          ...userData,
          sessions: userActivity.sessions,
        });
  
        setPerformanceData(
          userPerformance.data.map((item) => ({
            subject: userPerformance.kind[item.kind],
            value: item.value,
          }))
        );
  
        const dayMapping = { 1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D" };
  
        setSessionLengthData(
          userSessions.sessions.map((session) => ({
            day: dayMapping[session.day],
            sessionLength: session.sessionLength,
          }))
        );
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  if (loading) return <div>Loading...</div>;
  if (!user || !user.sessions) return <div>Aucun utilisateur trouvé ou données des sessions non disponibles</div>;

  const sessionData = user.sessions.map((session) => ({
    day: session.day,
    kilogram: session.kilogram,
    calories: session.calories / 40,
  }));

  const minKilograms = Math.min(...sessionData.map((d) => d.kilogram));
  const maxKilograms = Math.max(...sessionData.map((d) => d.kilogram));

  const todayScore = user.todayScore || user.score;
  const scoreData = [
    { name: "Score", value: todayScore * 200 },
    { name: "Reste", value: 100 - todayScore * 100 },
  ];

  return (
    <>
      <Header />
      <div className="left-banner">
        <div className="icon-button-section">
          <button className="icon-button">
            <img src={personIcon} className="icon-left" alt="Person" />
          </button>
          <button className="icon-button">
            <img src={natationIcon} className="icon-left" alt="Natation" />
          </button>
          <button className="icon-button">
            <img src={veloIcon} className="icon-left" alt="Vélo" />
          </button>
          <button className="icon-button">
            <img src={haltereIcon} className="icon-left" alt="Halteres" />
          </button>
        </div>
      </div>
      <div className="right-banner">
        <div className="key-data-wrapper">
          <div className="key-data-card">
            <img src={fireIcon} className="icon" alt="Fire" />
            <div className="column-info">
              <h3>{calorieCount} kcal</h3>
              <p>Calories</p>
            </div>
          </div>
          <div className="key-data-card">
            <img src={pouletIcon} className="icon" alt="Poulet" />
            <div className="column-info">
              <h3>{proteinCount} g</h3>
              <p>Protéines</p>
            </div>
          </div>
          <div className="key-data-card">
            <img src={pommeIcon} className="icon" alt="Pomme" />
            <div className="column-info">
              <h3>{carbohydrateCount} g</h3>
              <p>Glucides</p>
            </div>
          </div>
          <div className="key-data-card">
            <img src={hamburgerIcon} className="icon" alt="Hamburger" />
            <div className="column-info">
              <h3>{lipidCount} g</h3>
              <p>Lipides</p>
            </div>
          </div>
        </div>
      </div>
      <main>
        <h1>Bonjour <span>{user.userInfos.firstName}</span></h1>
        <p className="congrats-message">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

        <ActiviteQuotidienneChart
          sessionData={sessionData}  
          minKilograms={minKilograms}  
          maxKilograms={maxKilograms}  
        />

        <div className="container-three-diagram">
          <DureeSessionChart sessionLengthData={sessionLengthData} />
          <PerformanceRadarChart performanceData={performanceData} />
          <ScorePieChart scoreData={scoreData} />
        </div>
      </main>
    </>
  );
}

export default App;


