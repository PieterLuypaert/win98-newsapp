import React from "react";
import { Window } from "../../window";

export const news = () => {
  return (
    <Window
      title="The latest news"
      trigger={
        <div className="program">
          <img
            className="icon"
            alt="news icon"
            src="/assets/apps/newspaper.png"
          />
          <span className="name">News</span>
        </div>
      }

    >
    </Window>
  );
};
