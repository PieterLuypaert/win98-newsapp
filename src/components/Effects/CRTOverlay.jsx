import React from "react";
/* The CSS is imported globally via index.css usually, but we can import here to be safe if consistent with project */
/* or rely on global import. Since I added it to styles/components, I will likely import it in index.css */

export const CRTOverlay = () => {
  return (
    <>
      <div className="crt-overlay" />
      <div className="crt-container-effect" />
    </>
  );
};
