import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found.</h1>
      <p className="text-lg mb-4">
        The page you were looking for could not be found.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
