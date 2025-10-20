import React from "react";
import { useParams } from "react-router";
import { ArticleContent } from "../components/design/ArticleContent/ArticleContent";

export default function Article() {
  const { articleSlug } = useParams();
  return (
    <section className="page article-page">
      <ArticleContent articleSlug={articleSlug} />
    </section>
  );
}
