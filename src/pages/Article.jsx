import React from "react";
import { useParams } from "react-router";
import { ArticleContainer } from "@/components/functional/Article/ArticleContainer";

export function Article() {
  const { articleSlug } = useParams();
  return (
    <section className="page article-page">
      <ArticleContainer articleSlug={articleSlug} />
    </section>
  );
}

