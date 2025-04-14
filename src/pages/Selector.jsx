import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

function UserProfileSelector() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des utilisateurs');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.USER_MAIN_DATA);  
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur fetch:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Chargement des utilisateurs...</p>;
  }

  return (
    <div className="selector">
      <h2 className="titre">Sélectionnez un utilisateur :</h2>
      <div className="selector-containeur">
        {users.map((user) => (
          <div
            key={user.id}
            className="profile"
          >
            <Link
              to={`/profil/${user.id}`}  
              className="name-selector-profil"
            >
              {user.userInfos.firstName} {user.userInfos.lastName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfileSelector;





