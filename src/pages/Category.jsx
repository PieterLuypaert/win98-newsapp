import React from "react";
import { useParams } from "react-router";
import CategoryContainer from "@/components/functional/Category/CategoryContainer";

export default function Category() {
  const { categorySlug } = useParams();
  return (
    <section className="page category-page">
      <CategoryContainer categorySlug={categorySlug} />
    </section>
  );
}
