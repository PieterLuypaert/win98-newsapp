import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CategoryContent from "@/components/design/CategoryContent/CategoryContent";
import { fetchNews } from "@/core/modules/news/news.api";
import { fetchCategories } from "@/core/modules/categories/category.api";

const CategoryContainer = ({ categorySlug }) => {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState(categorySlug);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => setActiveCategory(categorySlug), [categorySlug]);

    const { data: news = [], isLoading: newsLoading } = useQuery({
        queryKey: ["news"],
        queryFn: fetchNews,
    });

    const { data: categories = [], isLoading: catLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const isLoading = newsLoading || catLoading;

    const handleArticleClick = (slug) => {
        navigate(`/article/${slug}`);
    };

    const handleCategoryClick = (slug) => {
        navigate(slug ? `/category/${slug}` : "/news");
        setActiveCategory(slug);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <CategoryContent
            isLoading={isLoading}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            articles={news}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onArticleClick={handleArticleClick}
        />
    );
};

export default CategoryContainer;
