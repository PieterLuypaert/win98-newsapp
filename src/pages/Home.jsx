import { Desktop } from "../components/Desktop";
import { useParams } from "react-router";

export const Home = ({ openWindow }) => {
  const { categorySlug } = useParams();

  return (
    <Desktop
      openWindow={openWindow}
      categorySlug={categorySlug}
      showIcons={true}
    />
  );
};
