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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sélectionnez un utilisateur :</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="cursor-pointer p-4 border rounded-xl shadow hover:bg-indigo-50"
          >
            <Link
              to={`/profil/${user.id}`}  
              className="block text-xl font-semibold"
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





