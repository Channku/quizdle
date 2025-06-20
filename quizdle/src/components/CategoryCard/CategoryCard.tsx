import React from "react";
import "./CategoryCard.css";

interface CategoryCardProps {
  name: string;
  emoji: string;
  color?: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, emoji, color, onClick }) => {
  return (
    <div
      className="category-card"
      onClick={onClick}
      style={{ backgroundColor: color || "#f0f0f0" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className="emoji">{emoji}</div>
      <div className="name">{name}</div>
    </div>
  );
};

export default CategoryCard;
