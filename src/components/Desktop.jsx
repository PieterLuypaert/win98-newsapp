import { useState } from "react";
import { useNavigate } from "react-router";
import "@styles/layout/programs.css";
import { DesktopIconContainer } from "@functional/DesktopIcon/DesktopIconContainer";
import { ClippyContainer } from "@functional/Clippy/ClippyContainer";
import * as Storage from "@core/storage";

const DEFAULT_POSITIONS = {
  news: { x: 20, y: 20 },
};

export const Desktop = ({ showIcons = true }) => {
  const navigate = useNavigate();
  const [iconPositions, setIconPositions] = useState(() =>
    Storage.getIconPositions()
  );

  const getClippyMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Goedemorgen! Klik op het News icoon om het laatste nieuws te lezen.";
    } else if (hour < 17) {
      return "Goedemiddag! Ontdek de laatste nieuwsartikelen.";
    } else {
      return "Goedenavond! Tijd voor het avondnieuws?";
    }
  };

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

  const handleResetPosition = (iconId) => {
    const updatedPositions = { ...iconPositions };
    delete updatedPositions[iconId];
    setIconPositions(updatedPositions);
    Storage.saveIconPositions(updatedPositions);
  };

  return (
    <div className="desktop" onContextMenu={(e) => e.preventDefault()}>
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
              position={iconPositions[icon.id] || DEFAULT_POSITIONS[icon.id]}
              onPositionChange={handlePositionChange}
              onResetPosition={handleResetPosition}
            />
          ))}
        </div>
      )}

      <ClippyContainer message={getClippyMessage()} />
    </div>
  );
};
