import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

interface CategoryCardProps {
  id: string;
  name: string;
  emoji: string;
  color?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, emoji, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      style={{ backgroundColor: color || "#f0f0f0" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="emoji">{emoji}</div>
      <div className="name">{name}</div>
    </div>
  );
};

export default CategoryCard;
