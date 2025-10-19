import { useNavigate } from "react-router";

export const Bookmark = () => {
  const navigate = useNavigate();

  const handleOpenBookmarks = () => {
    navigate("/bookmarks");

    window.dispatchEvent(
      new CustomEvent("openAppWindow", { detail: { type: "bookmarks" } })
    );
  };

  return (
    <button
      className="Bookmark"
      title="Bookmarks"
      onClick={handleOpenBookmarks}
    >
      <img
        className="icon"
        src="/assets/apps/bookmarks.png"
        alt="windows 98 Bookmarks logo"
      />
      <span className="label">Bookmarks</span>
    </button>
  );
};
