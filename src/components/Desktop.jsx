import "./design/NewsApp/programs.css";
import { ProgramGrid } from "./design/ProgramGrid/ProgramGrid";

export const Desktop = ({ openWindow }) => {
  return (
    <div className="desktop">
      <ProgramGrid openWindow={openWindow} />
    </div>
  );
};
