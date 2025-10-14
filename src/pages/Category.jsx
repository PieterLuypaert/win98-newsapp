import { Desktop } from "../components/Desktop";
import { useParams } from "react-router";

export const Category = () => {
  const { slug } = useParams();
  return <Desktop openWindow="category" categorySlug={slug} />;
};
