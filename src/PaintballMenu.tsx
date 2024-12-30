import React from "react";
import Card from "./Card";
import {
  FaPaintBrush,
  FaBullseye,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Example icons

const PaintballMenu: React.FC = () => {
  const handleCardClick = (action: string) => {
    alert(`You clicked on ${action}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card
        title="Gear Rental"
        description="Browse and rent paintball gear."
        icon={<FaPaintBrush />}
        onClick={() => handleCardClick("Gear Rental")}
      />
      <Card
        title="Game Modes"
        description="Explore exciting game modes."
        icon={<FaBullseye />}
        onClick={() => handleCardClick("Game Modes")}
      />
      <Card
        title="Teams"
        description="Create and manage your team."
        icon={<FaUsers />}
        onClick={() => handleCardClick("Teams")}
      />
      <Card
        title="Locations"
        description="Find nearby paintball arenas."
        icon={<FaMapMarkerAlt />}
        onClick={() => handleCardClick("Locations")}
      />
    </div>
  );
};

export default PaintballMenu;
