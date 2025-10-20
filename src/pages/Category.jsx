import React from "react";
// changed: useParams uit react-router
import { useParams } from "react-router";
import { CategoryContent } from "../components/design/CategoryContent/CategoryContent";

export default function Category() {
  const { categorySlug } = useParams();
  return (
    <section className="page category-page">
      <CategoryContent categorySlug={categorySlug} />
    </section>
  );
}
