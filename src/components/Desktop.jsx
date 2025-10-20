import { useNavigate } from "react-router";
import "../styles/layout/programs.css";
import { DesktopIcon } from "./design/DesktopIcon/DesktopIcon";

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
    </div>
  );
};
