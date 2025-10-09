import React, { useState, useEffect } from "react";
import { Window } from "../window/window";

export const login = () => {

  return (
    <Window
      title="Login or register"
      trigger={
        <div className="program">
          <img
            className="icon"
            alt="Login icon"
            src="/assets/apps/login.png"
          />
          <span className="name">Login</span>
        </div>
      }
    />
  );
  
};
