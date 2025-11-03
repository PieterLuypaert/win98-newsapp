import { useNavigate } from "react-router";
import "../styles/layout/programs.css";
import { DesktopIcon } from "./design/DesktopIcon/DesktopIcon";
import { Clippy } from "./design/Clippy/Clippy";

export const Desktop = ({ showIcons = true }) => {
  const navigate = useNavigate();

  return (
    <div className="desktop">
      {showIcons && (
        <div className="desktop-icons">
          <DesktopIcon
            icon="/assets/apps/newspaper.png"
            label="News"
            onClick={() => navigate("/news")}
            isImage={true}
          />
        </div>
      )}
      <Clippy message="Klik op het News icoon om te beginnen." />
    </div>
  );
};
