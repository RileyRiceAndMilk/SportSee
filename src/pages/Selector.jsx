import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/api';

function UserProfileSelector() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const useLocalData = true; // Contrôler l'utilisation des données locales (true) ou de l'API (false)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers(useLocalData); // Passe useLocalData ici
        setUsers(userList);
      } catch (error) {
        console.error("Erreur fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [useLocalData]);

  if (loading) {
    return <p className="p-4">Chargement des utilisateurs...</p>;
  }

  return (
    <div className="selector">
      <h2 className="titre">Sélectionnez un utilisateur :</h2>
      <div className="selector-containeur">
        {users.map((user) => (
          <div key={user.id} className="profile">
            <Link to={`/profil/${user.id}`} className="name-selector-profil">
              {user.userInfos.firstName} {user.userInfos.lastName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfileSelector;








