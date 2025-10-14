import { news as News } from "../NewsApp/news";

export const ProgramGrid = ({ openWindow }) => {
  return (
    <div className="programs">
      <News isOpen={openWindow === "news"} />
    </div>
  );
};
