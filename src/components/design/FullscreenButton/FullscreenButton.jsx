import { Button } from "../Button/Button";

export const FullscreenButton = ({ onClick }) => {
  return (
    <Button
      className="win98-button"
      title="Fullscreen"
      onClick={onClick}
      variant="win98"
    >
      ⛶
    </Button>
  );
};
