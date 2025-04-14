import React from 'react';
import { Link } from "react-router-dom";
import "../css/style.css";

const NotFoundPage = () => {
  return (
    <>
      <main>
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
      </main>
    </>
  );
};

export default NotFoundPage;