import { news as News } from "../NewsApp/news";
import { login as Login } from "../LoginApp/Login";

export const ProgramGrid = () => {
  return (
    <div className="programs">
      <News />
      <Login />
    </div>
  );
};
