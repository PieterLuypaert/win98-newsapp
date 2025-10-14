import { Desktop } from "../components/Desktop";
import { useParams } from "react-router";

export const Article = () => {
  const { articleSlug } = useParams();
  return (
    <Desktop
      openWindow="article"
      articleSlug={articleSlug}
      showIcons={true}
      key={`article-${articleSlug}`}
    />
  );
};
