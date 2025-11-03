import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/layout/programs.css";
import { DesktopIconContainer } from "./functional/DesktopIcon/DesktopIconContainer";
import { Clippy } from "./design/Clippy/Clippy";
import * as Storage from "../core/storage";

export const Desktop = ({ showIcons = true }) => {
  const navigate = useNavigate();
  const [iconPositions, setIconPositions] = useState(() =>
    Storage.getIconPositions()
  );

  const icons = [
    {
      id: "news",
      icon: "/assets/apps/newspaper.png",
      label: "News",
      onClick: () => navigate("/news"),
      isImage: true,
    },
  ];

  const handlePositionChange = (iconId, newPosition) => {
    const updatedPositions = {
      ...iconPositions,
      [iconId]: newPosition,
    };
    setIconPositions(updatedPositions);
    Storage.saveIconPositions(updatedPositions);
  };

  return (
    <div className="desktop">
      {showIcons && (
        <div className="desktop-icons">
          {icons.map((icon) => (
            <DesktopIconContainer
              key={icon.id}
              id={icon.id}
              icon={icon.icon}
              label={icon.label}
              onClick={icon.onClick}
              isImage={icon.isImage}
              position={iconPositions[icon.id]}
              onPositionChange={handlePositionChange}
            />
          ))}
        </div>
      )}
      <Clippy message="Klik op het News icoon om te beginnen." />
    </div>
  );
};
