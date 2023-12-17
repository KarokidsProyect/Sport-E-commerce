import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, text, icon, onClick }) => {
  return (
    <Link onClick={onClick} to={link} className="flex flex-col items-center">
      <button className="flex flex-col items-center p-2">{icon}</button>
      <span className="text-black">{text}</span>
    </Link>
  );
};

export default Button;
