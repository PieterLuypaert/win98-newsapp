import { Desktop } from "../components/Desktop";
import { useParams } from "react-router";

export const Article = () => {
  const { slug } = useParams();
  return <Desktop openWindow="article" articleSlug={slug} />;
};
