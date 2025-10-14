import { Desktop } from "../components/Desktop";
import { useParams } from "react-router";

export const Category = () => {
  const { categorySlug } = useParams();
  return (
    <Desktop
      openWindow="category"
      categorySlug={categorySlug}
      showIcons={true}
    />
  );
};
